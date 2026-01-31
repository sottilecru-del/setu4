
import React, { useState, useEffect, useRef } from 'react';

interface NameInputScreenProps {
  onSubmit: (name: string) => void;
  onBack: () => void;
}

const NameInputScreen: React.FC<NameInputScreenProps> = ({ onSubmit, onBack }) => {
  const [name, setName] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Check for speech recognition support
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.lang = 'hi-IN';
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setName(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      if (recognitionRef.current) {
        setIsListening(true);
        recognitionRef.current.start();
      } else {
        alert('आपका ब्राउज़र स्पीच रिकग्निशन को सपोर्ट नहीं करता है।');
      }
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#fdf8f2]">
      {/* Header */}
      <div className="bg-[#e45d1a] pt-12 pb-4 px-6 flex items-center justify-center text-white relative shadow-md">
        <button onClick={onBack} className="absolute left-6 p-1">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <h1 className="text-2xl font-bold font-hindi tracking-wide">पंजीकरण</h1>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10 space-y-8">
        <div className="w-full text-center space-y-2">
          <h2 className="text-3xl font-bold font-hindi text-gray-800">
            आपका नाम क्या है?
          </h2>
          <p className="text-gray-500 font-hindi">कृपया अपना पूरा नाम लिखें या बोलें</p>
        </div>

        <div className="w-full space-y-6">
          <div className="relative w-full">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="यहाँ नाम लिखें..."
              className="w-full px-6 py-5 border-2 border-gray-100 rounded-2xl text-xl font-bold focus:outline-none focus:border-[#e45d1a] transition-all bg-white shadow-inner font-hindi"
            />
            
            {/* Voice Input Button */}
            <button
              onClick={toggleListening}
              className={`absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                isListening ? 'bg-red-500 animate-pulse' : 'bg-[#e45d1a]'
              } text-white shadow-lg`}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                {isListening ? (
                  <rect x="6" y="6" width="12" height="12"></rect>
                ) : (
                  <>
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                    <line x1="12" y1="19" x2="12" y2="23"></line>
                    <line x1="8" y1="23" x2="16" y2="23"></line>
                  </>
                )}
              </svg>
            </button>
          </div>

          <button
            onClick={() => name && onSubmit(name)}
            disabled={!name}
            className={`w-full py-5 text-3xl font-bold rounded-2xl shadow-xl transition-all font-hindi ${
              name ? 'bg-[#e45d1a] text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            आगे बढ़ें
          </button>
        </div>

        {isListening && (
          <div className="text-[#e45d1a] font-hindi font-bold animate-bounce mt-4">
            सुन रहे हैं... बोलिए
          </div>
        )}
      </div>
    </div>
  );
};

export default NameInputScreen;
