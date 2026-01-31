
import React, { useState, useRef } from 'react';

interface PhotoUploadScreenProps {
  onUpload: (photo: string) => void;
  onBack: () => void;
}

const PhotoUploadScreen: React.FC<PhotoUploadScreenProps> = ({ onUpload, onBack }) => {
  const [photo, setPhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCapture = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex-1 flex flex-col bg-[#fdf8f2]">
      <div className="bg-[#e45d1a] pt-12 pb-4 px-6 flex items-center justify-center text-white relative shadow-md">
        <button onClick={onBack} className="absolute left-6 p-1">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <h1 className="text-2xl font-bold font-hindi tracking-wide">पंजीकरण</h1>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold font-hindi text-gray-800">अपनी फोटो लगायें</h2>
          <p className="text-gray-500 font-hindi">यह फोटो आपकी प्रोफ़ाइल पर दिखेगी</p>
        </div>

        <div 
          onClick={handleCapture}
          className="relative w-56 h-56 rounded-full border-4 border-dashed border-gray-300 bg-white flex items-center justify-center overflow-hidden cursor-pointer shadow-inner"
        >
          {photo ? (
            <img src={photo} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <div className="flex flex-col items-center text-gray-400">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                <circle cx="12" cy="13" r="4"></circle>
              </svg>
              <span className="text-sm font-hindi mt-2">फोटो लें</span>
            </div>
          )}
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*" 
            capture="user"
            onChange={handleFileChange} 
          />
        </div>

        <button
          onClick={() => photo && onUpload(photo)}
          disabled={!photo}
          className={`w-full py-5 text-3xl font-bold rounded-2xl shadow-xl transition-all font-hindi ${
            photo ? 'bg-[#e45d1a] text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          आगे बढ़ें
        </button>
      </div>
    </div>
  );
};

export default PhotoUploadScreen;
