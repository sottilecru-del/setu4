
import React, { useState, useEffect, useRef } from 'react';
import { Job } from '../App';

interface JobAlarmProps {
  job: Job;
  onAccept: (job: Job) => void;
  onDecline: () => void;
}

const JobAlarm: React.FC<JobAlarmProps> = ({ job, onAccept, onDecline }) => {
  const [timeLeft, setTimeLeft] = useState(20);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Alarm Sound Logic
    // Using a reliable public URL for a digital alarm sound
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/995/995-preview.mp3');
    audio.loop = true;
    audioRef.current = audio;
    
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.log("Autoplay prevented. User interaction might be required for sound.");
      });
    }

    // Timer Logic
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleDecline();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleAccept = () => {
    if (audioRef.current) audioRef.current.pause();
    onAccept(job);
  };

  const handleDecline = () => {
    if (audioRef.current) audioRef.current.pause();
    onDecline();
  };

  return (
    <div className="absolute inset-0 z-[200] bg-[#fdf8f2] flex flex-col animate-in fade-in duration-300">
      {/* Header Bar */}
      <div className="bg-[#e45d1a] pt-12 pb-4 px-6 flex items-center justify-center text-white shadow-lg">
        <div className="flex items-center gap-3">
          <div className="relative">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="white" className="animate-bounce">
              <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
            </svg>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-ping"></div>
          </div>
          <h1 className="text-3xl font-bold font-hindi tracking-wide">काम का अलार्म !</h1>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 pb-12">
        {/* Worker Illustration Circle */}
        <div className="relative mb-8">
          <div className="w-64 h-64 bg-white rounded-full flex items-center justify-center shadow-sm border border-orange-50 overflow-hidden">
             <img 
               src="https://api.dicebear.com/7.x/avataaars/svg?seed=AlarmWorker&accessories=none&top=shortHair&hairColor=black&facialHair=none&clothing=shirtVNeck&clothingColor=f59e0b" 
               alt="Worker" 
               className="w-56 h-56 object-contain translate-y-4" 
             />
             <div className="absolute top-12 left-1/2 -translate-x-1/2 w-32 h-14 bg-[#f59e0b] rounded-t-[50px] border-b-4 border-black/10"></div>
          </div>
        </div>

        {/* Job Details */}
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl font-bold text-gray-800 font-hindi">{job.role}</h2>
          <p className="text-4xl font-bold text-gray-700">{job.pay}</p>
          
          <div className="flex flex-col items-center gap-2 pt-2">
            <div className="flex items-center gap-2 text-gray-600">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="#e45d1a">
                 <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
               </svg>
               <span className="text-2xl font-bold font-hindi">अनुप, राजें · {job.distance || '1 किमी'}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="#f59e0b" className="opacity-70">
                 <rect x="3" y="4" width="18" height="18" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="2" />
                 <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" />
                 <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" />
                 <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2" />
               </svg>
               <span className="text-2xl font-bold font-hindi">नगय: {job.duration}</span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="w-full space-y-4">
          <button 
            onClick={handleAccept}
            className="w-full bg-[#4b830d] text-white py-5 rounded-xl flex items-center justify-center gap-3 shadow-lg active:scale-95 transition-transform"
          >
             <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                 <polyline points="20 6 9 17 4 12"></polyline>
               </svg>
             </div>
             <span className="text-3xl font-bold font-hindi">स्वीकार करें</span>
          </button>

          <button 
            onClick={handleDecline}
            className="w-full bg-[#ee2d0e] text-white py-5 rounded-xl flex items-center justify-center gap-3 shadow-lg active:scale-95 transition-transform"
          >
             <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                 <line x1="18" y1="6" x2="6" y2="18"></line>
                 <line x1="6" y1="6" x2="18" y2="18"></line>
               </svg>
             </div>
             <span className="text-3xl font-bold font-hindi">मना करें</span>
          </button>
        </div>

        {/* Timer Bar */}
        <div className="w-full mt-8">
          <div className="flex justify-between items-center mb-1">
             <span className="text-sm font-hindi text-gray-500">अलार्म {timeLeft} सेकंड में बंद हो जाएगा</span>
          </div>
          <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#e45d1a] transition-all duration-1000 ease-linear"
              style={{ width: `${(timeLeft / 20) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobAlarm;
