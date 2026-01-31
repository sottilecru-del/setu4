
import React from 'react';
import { Job } from '../App';

interface MyJobsScreenProps {
  jobs: Job[];
  onJobClick: (job: Job) => void;
}

const MyJobsScreen: React.FC<MyJobsScreenProps> = ({ jobs, onJobClick }) => {
  return (
    <div className="flex-1 flex flex-col bg-[#fdf8f2]">
      {/* Header */}
      <div className="bg-[#e45d1a] pt-12 pb-4 px-6 flex items-center justify-between text-white shadow-md">
        <div className="w-8"></div>
        <h1 className="text-2xl font-bold font-hindi tracking-wide">मेरे काम</h1>
        <div className="w-8"></div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-24">
        {jobs.length > 0 ? (
          jobs.map(job => (
            <div 
              key={job.id} 
              onClick={() => onJobClick(job)}
              className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex gap-4 items-center active:scale-[0.98] transition-all cursor-pointer"
            >
              <div className="relative w-16 h-16 flex-shrink-0">
                <img 
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${job.type}&accessories=none&top=shortHair&hairColor=black&facialHair=none&clothing=shirtVNeck&clothingColor=f59e0b`} 
                  alt="Job Icon" 
                  className="w-full h-full rounded-full bg-gray-50" 
                />
                <div className="absolute top-0 left-1.5 w-6 h-3 bg-yellow-400 rounded-t-full border border-black/5"></div>
              </div>
              
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 font-hindi">{job.role}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[#4b830d] font-bold">{job.pay}</span>
                  <div className="h-4 w-[1px] bg-gray-300"></div>
                  <span className="text-gray-500 text-sm font-hindi">चालू है</span>
                </div>
              </div>

              <div className="bg-[#e45d1a] p-2 rounded-full text-white">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-8 text-gray-400 space-y-4">
             <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-4xl">
               💼
             </div>
             <p className="text-xl font-hindi">आपने अभी तक कोई काम स्वीकार नहीं किया है।</p>
             <p className="text-sm font-hindi">'काम ढूंढें' टैब पर जाएं और अपनी पसंद का काम चुनें।</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyJobsScreen;
