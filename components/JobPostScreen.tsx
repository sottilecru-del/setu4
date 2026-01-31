
import React, { useState } from 'react';

interface JobPostScreenProps {
  onPost: (data: any) => void;
}

const JobPostScreen: React.FC<JobPostScreenProps> = ({ onPost }) => {
  const [workerType, setWorkerType] = useState('मजदूर');
  const [count, setCount] = useState(5);
  const [wage, setWage] = useState(600); // Default price 600
  const [duration, setDuration] = useState(1); // Default time 1 day

  const workerTypes = [
    { id: 'मजदूर', title: 'मजदूर', icon: '👷' },
    { id: 'मिस्त्री', title: 'मिस्त्री', icon: '🏗️' },
    { id: 'बिजली मिस्त्री', title: 'बिजली मिस्त्री', icon: '⚡' },
    { id: 'प्लंबर', title: 'प्लंबर', icon: '🔧' }
  ];

  const adjustWage = (amount: number) => {
    setWage(prev => Math.max(100, prev + amount));
  };

  const adjustDuration = (amount: number) => {
    setDuration(prev => Math.max(1, prev + amount));
  };

  return (
    <div className="flex-1 flex flex-col bg-[#fdf8f2]">
      {/* Header */}
      <div className="bg-[#e45d1a] pt-12 pb-4 px-6 flex items-center justify-between text-white shadow-md">
        <button className="p-1">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <h1 className="text-2xl font-bold font-hindi tracking-wide">काम पोस्ट करें</h1>
        <div className="w-8"></div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 pb-24">
        {/* Worker Type Section */}
        <section>
          <h2 className="text-xl font-bold font-hindi text-gray-800 mb-3">कामगार का प्रकार</h2>
          <div className="grid grid-cols-4 gap-2">
            {workerTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setWorkerType(type.id)}
                className={`flex flex-col items-center gap-2 p-2 rounded-xl border-2 transition-all ${
                  workerType === type.id 
                  ? 'bg-white border-[#e45d1a] shadow-sm' 
                  : 'bg-transparent border-transparent'
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-sm relative ${
                  workerType === type.id ? 'bg-[#f59e0b]' : 'bg-gray-100'
                }`}>
                  {type.icon}
                  {workerType === type.id && (
                    <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1 border-2 border-white">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                  )}
                </div>
                <span className={`text-[10px] font-bold font-hindi text-center leading-tight ${
                  workerType === type.id ? 'text-[#e45d1a]' : 'text-gray-500'
                }`}>
                  {type.title}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Count Section */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold font-hindi text-gray-800">संख्या: {count} {workerType}</h2>
          <div className="relative">
            <select 
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value))}
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-xl font-bold font-hindi appearance-none focus:outline-none focus:ring-2 focus:ring-[#e45d1a]/20"
            >
              {[1, 2, 3, 4, 5, 10, 15, 20].map(n => (
                <option key={n} value={n}>{n} {workerType}</option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>
        </section>

        {/* Wage Adjustment Stepper */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold font-hindi text-gray-800">मजदूरी (प्रति दिन):</h2>
          <div className="flex items-center justify-between bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <button 
              onClick={() => adjustWage(-50)}
              className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-3xl font-bold text-gray-600 active:bg-gray-200"
            >
              -
            </button>
            <div className="text-center">
               <span className="text-3xl font-bold text-gray-900">₹ {wage}</span>
               <p className="text-xs text-gray-500 font-hindi">प्रति व्यक्ति / दिन</p>
            </div>
            <button 
              onClick={() => adjustWage(50)}
              className="w-12 h-12 rounded-full bg-[#e45d1a] flex items-center justify-center text-3xl font-bold text-white active:scale-95 transition-transform shadow-md"
            >
              +
            </button>
          </div>
        </section>

        {/* Duration Adjustment Stepper */}
        <section className="space-y-2">
          <h2 className="text-xl font-bold font-hindi text-gray-800">अवधि (समय):</h2>
          <div className="flex items-center justify-between bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <button 
              onClick={() => adjustDuration(-1)}
              className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-3xl font-bold text-gray-600 active:bg-gray-200"
            >
              -
            </button>
            <div className="text-center">
               <span className="text-3xl font-bold text-gray-900">{duration} दिन</span>
               <p className="text-xs text-gray-500 font-hindi">काम की कुल अवधि</p>
            </div>
            <button 
              onClick={() => adjustDuration(1)}
              className="w-12 h-12 rounded-full bg-[#4b830d] flex items-center justify-center text-3xl font-bold text-white active:scale-95 transition-transform shadow-md"
            >
              +
            </button>
          </div>
        </section>

        {/* Post Button */}
        <button 
          onClick={() => onPost({ workerType, count, wage, duration })}
          className="w-full bg-[#e45d1a] text-white py-5 rounded-2xl text-3xl font-bold font-hindi shadow-lg active:scale-95 transition-transform mt-4"
        >
          काम पोस्ट करें
        </button>
      </div>
    </div>
  );
};

export default JobPostScreen;
