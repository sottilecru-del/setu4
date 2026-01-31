
import React, { useState, useEffect, useRef } from 'react';

interface LocationTrackingProps {
  onBack: () => void;
  job?: any;
  workerName?: string;
  onReached?: () => void;
}

const LocationTracking: React.FC<LocationTrackingProps> = ({ onBack, job, workerName, onReached }) => {
  const [timeLeft, setTimeLeft] = useState(240); // 4 minutes in seconds
  const [isSharing, setIsSharing] = useState(false);
  const [hasReached, setHasReached] = useState(false);
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);
  const watchId = useRef<number | null>(null);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    return () => {
      if (watchId.current !== null) {
        navigator.geolocation.clearWatch(watchId.current);
      }
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleShareLocation = () => {
    if (!navigator.geolocation) {
      alert("आपका ब्राउज़र लोकेशन शेयरिंग को सपोर्ट नहीं करता है।");
      return;
    }

    if (isSharing) {
      if (watchId.current !== null) {
        navigator.geolocation.clearWatch(watchId.current);
        watchId.current = null;
      }
      setIsSharing(false);
      return;
    }

    setIsSharing(true);
    
    watchId.current = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserCoords({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error("Error getting location", error);
        alert("लोकेशन एक्सेस करने में समस्या हुई। कृपया सेटिंग्स जांचें।");
        setIsSharing(false);
      },
      { enableHighAccuracy: true }
    );
  };

  const handleReached = () => {
    setHasReached(true);
    if (onReached) onReached();
    alert(`सूचना: ${workerName} काम की लोकेशन पर पहुंच चुके हैं! ठेकेदार को मैसेज भेज दिया गया है।`);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#fdf8f2] h-full relative">
      {/* Reached Success Overlay */}
      {hasReached && (
        <div className="absolute inset-0 bg-[#4b830d]/90 z-[100] flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-300">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-2xl">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#4b830d" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <h2 className="text-4xl font-bold text-white font-hindi mb-4">आप पहुंच गए हैं!</h2>
          <p className="text-xl text-white/90 font-hindi mb-8">ठेकेदार को जानकारी भेज दी गई है कि आप लोकेशन पर हैं।</p>
          <button 
            onClick={onBack}
            className="bg-white text-[#4b830d] px-10 py-4 rounded-2xl text-2xl font-bold font-hindi shadow-lg active:scale-95 transition-transform"
          >
            वापस जाएं
          </button>
        </div>
      )}

      {/* Orange Header */}
      <div className="bg-[#e45d1a] pt-12 pb-4 px-6 flex items-center justify-between text-white relative z-10 shadow-md">
        <button onClick={onBack} className="p-1">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold font-hindi tracking-wide">लोकेशन ट्रैक</h1>
          {timeLeft > 0 && (
            <div className="text-[10px] font-hindi bg-white/20 px-2 py-0.5 rounded-full flex items-center gap-1 animate-pulse">
              <span>ठेकेदार का मना करने का समय:</span>
              <span className="font-bold">{formatTime(timeLeft)}</span>
            </div>
          )}
        </div>
        <div className="w-8"></div>
      </div>

      {/* Map View Area */}
      <div className="flex-1 relative overflow-hidden bg-[#eee7de]">
        {/* Mock Map Background */}
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <div className="absolute top-[20%] left-0 w-full h-[30px] bg-white -rotate-12 flex items-center justify-center">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Jogeshwari-Vikhroli Link Rd</span>
          </div>
          <div className="absolute top-[55%] left-0 w-full h-[30px] bg-white -rotate-12 flex items-center justify-center">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Jogeshwari-Vikhroli Link Rd</span>
          </div>
          <div className="absolute left-[30%] top-0 w-[20px] h-full bg-white rotate-12"></div>
          <div className="absolute left-[70%] top-0 w-[25px] h-full bg-white rotate-6"></div>
          
          <span className="absolute top-[35%] left-[5%] text-[10px] text-gray-400 font-bold">PVR ICON</span>
          <span className="absolute top-[50%] left-[5%] text-[10px] text-gray-400 font-bold">Gokuldham</span>
          <span className="absolute top-[30%] right-[10%] text-[10px] text-gray-400 font-bold">SEEPZ</span>
          <span className="absolute top-[60%] left-[40%] text-[10px] text-gray-400 font-bold">Goregaon</span>
          <span className="absolute bottom-[25%] right-[15%] text-[10px] text-gray-400 font-bold">Majas</span>
        </div>

        {/* Path Dotted Line */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 375 600">
           <path 
             d="M100,100 Q150,150 130,220 T240,400" 
             fill="none" 
             stroke={isSharing ? "#e45d1a" : "#4b830d"} 
             strokeWidth="6" 
             strokeDasharray="1, 12" 
             strokeLinecap="round"
             className="transition-colors duration-500"
           />
        </svg>

        {/* Home Icon Marker (Target) */}
        <div className="absolute top-[75px] left-[85px] w-12 h-12 flex items-center justify-center">
          <div className="bg-[#e45d1a] p-2 rounded-lg shadow-lg">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
          </div>
          <div className="absolute -bottom-1 w-6 h-1 bg-black/10 rounded-full"></div>
        </div>

        {/* Worker Pin Marker */}
        <div 
          className="absolute top-[380px] left-[230px] w-16 h-16 flex flex-col items-center transition-all duration-1000"
          style={isSharing ? { transform: 'scale(1.1) translateY(-10px)' } : {}}
        >
          <div className={`relative w-12 h-12 rounded-full border-4 ${isSharing ? 'border-[#4b830d]' : 'border-[#e45d1a]'} bg-white overflow-hidden shadow-xl transition-colors`}>
             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Mason&accessories=none&top=shortHair&hairColor=black&facialHair=none&clothing=shirtVNeck&clothingColor=f59e0b" alt="Worker" className="w-full h-full object-cover" />
             <div className="absolute top-0 left-1 w-8 h-3 bg-yellow-400 rounded-t-full border border-black/5"></div>
          </div>
          <div className={`w-4 h-4 ${isSharing ? 'bg-[#4b830d]' : 'bg-[#e45d1a]'} -mt-1 rotate-45 shadow-sm transition-colors`}></div>
          <div className="w-3 h-3 bg-red-600 rounded-full shadow-md -mt-1 relative z-10 animate-ping"></div>
          
          {isSharing && (
             <div className="absolute -top-10 bg-white px-2 py-1 rounded shadow-md border border-gray-100 whitespace-nowrap">
                <span className="text-[10px] font-bold text-[#4b830d] font-hindi">लोकेशन शेयर हो रही है</span>
             </div>
          )}
        </div>
      </div>

      {/* Floating User Info Card */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[345px] bg-white rounded-3xl p-5 shadow-2xl space-y-4 border border-gray-100">
        <div className="flex justify-between items-start">
          <div className="flex gap-4">
            <div className="relative w-16 h-16 rounded-full bg-gray-100 overflow-hidden border-2 border-[#f59e0b]">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Mason&accessories=none&top=shortHair&hairColor=black&facialHair=none&clothing=shirtVNeck&clothingColor=f59e0b" alt="Worker" className="w-full h-full object-cover" />
              <div className="absolute top-0 left-2 w-6 h-3 bg-yellow-400 rounded-t-full border border-black/5"></div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 font-hindi">{workerName}</h2>
              <p className="text-lg font-bold text-gray-700">{job?.pay || '₹700 / दिन'}</p>
            </div>
          </div>
          <div className="bg-[#4b830d] p-1.5 rounded-full shadow-sm">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
               <polyline points="20 6 9 17 4 12"></polyline>
             </svg>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-3 flex flex-col items-center">
           <p className="text-lg font-bold text-gray-800 font-hindi">2.1किमी <span className="text-[#4b830d]">(10 मिनट में पहुंचेंगे)</span></p>
        </div>

        <div className="flex items-center justify-between px-2">
           <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-[#4b830d] rounded-full flex items-center justify-center">
                 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                   <polyline points="20 6 9 17 4 12"></polyline>
                 </svg>
              </div>
              <span className="text-[#4b830d] font-bold font-hindi">काम करते हुए</span>
           </div>
           <div className="h-6 w-[1.5px] bg-gray-200"></div>
           <div className="flex items-center gap-2">
              <div className="text-[#4b830d]">
                 <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                 </svg>
              </div>
              <span className="text-gray-600 font-bold font-hindi">करम कुमार</span>
           </div>
        </div>

        <div className="flex gap-3">
           <a 
             href="tel:9876543210" 
             className="flex-[4] bg-[#4b830d] text-white py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform no-underline"
           >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-3.7-.35-3.57-.55-3.57-1.78 0-.55-.45-1-1-1H3.5c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z"/>
              </svg>
              <span className="text-2xl font-bold font-hindi">बात करें</span>
           </a>
           <button 
             onClick={isSharing ? handleReached : handleShareLocation}
             className={`flex-[6] ${isSharing ? 'bg-[#4b830d]' : 'bg-[#e45d1a]'} text-white py-4 rounded-xl flex items-center justify-center shadow-lg active:scale-95 transition-all`}
           >
              <span className="text-2xl font-bold font-hindi">
                {isSharing ? 'पहुंच गए' : 'लोकेशन शेयर करें'}
              </span>
           </button>
        </div>
      </div>
      
      {/* Disclaimer Overlay */}
      {!isSharing && timeLeft > 0 && (
        <div className="absolute top-28 left-1/2 -translate-x-1/2 w-[80%] bg-white/90 backdrop-blur-sm border border-orange-200 rounded-lg p-2 z-20 shadow-sm text-center">
          <p className="text-[10px] text-gray-700 font-hindi">
            ठेकेदार के पास आपको मना करने के लिए <span className="text-[#e45d1a] font-bold">{formatTime(timeLeft)}</span> मिनट हैं। उसके बाद काम पक्का हो जाएगा।
          </p>
        </div>
      )}

      {isSharing && !hasReached && (
        <div className="absolute top-28 left-1/2 -translate-x-1/2 w-[80%] bg-[#4b830d]/90 backdrop-blur-sm border border-green-200 rounded-lg p-3 z-20 shadow-lg text-center animate-bounce">
          <p className="text-xs text-white font-bold font-hindi flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
            रियल-टाइम लोकेशन शेयर हो रही है...
          </p>
        </div>
      )}
    </div>
  );
};

export default LocationTracking;
