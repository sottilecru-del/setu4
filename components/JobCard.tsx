
import React from 'react';

interface Job {
  id: number;
  role: string;
  pay: string;
  payType?: string;
  distance?: string;
  duration: string;
  progress: number;
  type: string;
}

interface JobCardProps {
  job: Job;
  onAccept: () => void;
  onReject: () => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onAccept, onReject }) => {
  const renderIcon = () => {
    switch (job.type) {
      case 'mason':
        return (
          <div className="relative w-20 h-20">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Mason&accessories=none&top=shortHair&hairColor=black&facialHair=none&clothing=shirtVNeck&clothingColor=f59e0b" alt="Mason" className="w-full h-full rounded-full bg-gray-100" />
            <div className="absolute top-0 left-2 w-8 h-4 bg-yellow-400 rounded-t-full border border-black/10"></div>
            <div className="absolute bottom-2 right-0 w-8 h-8">⚒️</div>
          </div>
        );
      case 'plumber':
        return (
          <div className="relative w-20 h-20">
             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Plumber&accessories=none&top=shortHair&hairColor=black&facialHair=none&clothing=shirtVNeck&clothingColor=f59e0b" alt="Plumber" className="w-full h-full rounded-full bg-gray-100" />
             <div className="absolute top-0 left-2 w-8 h-4 bg-yellow-400 rounded-t-full border border-black/10"></div>
             <div className="absolute bottom-2 right-0 w-8 h-8">🔧</div>
          </div>
        );
      case 'painter':
        return (
          <div className="relative w-20 h-20">
             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Painter&accessories=none&top=shortHair&hairColor=black&facialHair=none&clothing=overall&clothingColor=3b82f6" alt="Painter" className="w-full h-full rounded-full bg-gray-100" />
             <div className="absolute top-0 left-2 w-8 h-4 bg-yellow-400 rounded-t-full border border-black/10"></div>
             <div className="absolute bottom-2 right-0 w-8 h-8">🖌️</div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full animate-in slide-in-from-right duration-300">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 relative overflow-hidden">
        <div className="flex justify-between">
          <div className="flex gap-3">
            {renderIcon()}
            <div className="flex flex-col justify-center">
              <h2 className="text-xl font-bold text-gray-900 font-hindi">{job.role}</h2>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-gray-900">{job.pay}</div>
            <div className="text-sm text-gray-500 font-hindi">{job.payType || ''}</div>
            {job.distance && <div className="text-sm text-gray-500 font-hindi">{job.distance}</div>}
          </div>
        </div>

        <div className="mt-4 space-y-1">
          <div className="relative h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-[#e45d1a] rounded-full transition-all duration-500" 
              style={{ width: `${job.progress}%` }}
            ></div>
            <div 
              className="absolute h-4 w-4 bg-[#e45d1a] rounded-full top-1/2 -translate-y-1/2 -translate-x-1/2 border-2 border-white shadow-sm"
              style={{ left: `${job.progress}%` }}
            ></div>
          </div>
          <div className="flex justify-end">
            <span className="text-sm font-bold text-gray-800 font-hindi">{job.duration}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-2">
        <button 
          onClick={onAccept}
          className="flex-1 bg-[#4b830d] text-white font-bold py-3 rounded-lg text-lg font-hindi shadow-sm active:scale-95 transition-transform"
        >
          स्वीकार करें
        </button>
        <button 
          onClick={onReject}
          className="flex-1 bg-[#ee2d0e] text-white font-bold py-3 rounded-lg text-lg font-hindi shadow-sm active:scale-95 transition-transform"
        >
          मना करें
        </button>
      </div>
    </div>
  );
};

export default JobCard;
