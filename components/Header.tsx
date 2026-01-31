
import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="flex items-baseline space-x-0.5">
        <h1 className="text-4xl font-extrabold text-[#9e3122] tracking-tight">Rozgaar</h1>
        <div className="relative">
          <h1 className="text-4xl font-extrabold text-[#e45d1a] tracking-tight">Setu</h1>
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
             {/* Stylized Bridge Icon */}
             <svg width="40" height="15" viewBox="0 0 40 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 10C15 2 25 2 35 10" stroke="#e45d1a" strokeWidth="2" strokeLinecap="round" />
                <circle cx="37" cy="11" r="1.5" fill="#e45d1a" />
             </svg>
          </div>
        </div>
      </div>
      
      <div className="mt-4 w-full flex flex-col items-center">
        <div className="h-[1px] w-48 bg-gray-300"></div>
        <p className="py-2 text-xl font-medium text-gray-700 font-hindi">
          काम करें, रोज़गार पायें
        </p>
        <div className="h-[1px] w-48 bg-gray-300"></div>
      </div>
    </div>
  );
};

export default Header;
