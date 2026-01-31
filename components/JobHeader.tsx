
import React from 'react';

interface JobHeaderProps {
  title: string;
}

const JobHeader: React.FC<JobHeaderProps> = ({ title }) => {
  return (
    <div className="bg-[#e45d1a] pt-12 pb-4 px-6 flex items-center justify-between text-white shadow-md">
      <button className="p-1">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      
      <h1 className="text-2xl font-bold font-hindi tracking-wide">{title}</h1>
      
      <button className="p-1">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/>
        </svg>
      </button>
    </div>
  );
};

export default JobHeader;
