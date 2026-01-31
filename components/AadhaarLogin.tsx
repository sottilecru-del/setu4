
import React from 'react';

const AadhaarLogin: React.FC = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <p className="text-xl font-semibold mb-4 text-gray-800">
        आधार से वेरिफाई करें
      </p>
      
      <button className="w-full bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col items-center hover:bg-gray-50 transition-colors">
        <div className="flex flex-col items-center">
          {/* Mock Aadhaar Logo */}
          <div className="mb-1">
            <svg width="60" height="40" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M30 5C22 5 15 10 12 18H15C18 12 24 9 30 9C36 9 42 12 45 18H48C45 10 38 5 30 5Z" fill="#FFA500" />
              <path d="M30 11C25 11 21 14 19 18H22C24 16 27 15 30 15C33 15 36 16 38 18H41C39 14 35 11 30 11Z" fill="#FFA500" />
              <path d="M30 16.5C28 16.5 26.5 17.5 26 18H34C33.5 17.5 32 16.5 30 16.5Z" fill="#FFA500" />
              <path d="M20 22C20 28 25 33 30 33C35 33 40 28 40 22H36C36 25 33 28 30 28C27 28 24 25 24 22H20Z" fill="#9e3122" />
              <rect x="25" y="24" width="10" height="2" fill="#9e3122" />
            </svg>
          </div>
          <span className="text-[#9e3122] text-xs font-bold tracking-[0.2em]">AADHAAR</span>
        </div>
      </button>
    </div>
  );
};

export default AadhaarLogin;
