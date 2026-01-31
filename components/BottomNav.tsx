
import React from 'react';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { 
      id: 'jobs', 
      label: 'काम ढूंढें', 
      icon: (active: boolean) => (
        <svg className={`w-8 h-8 ${active ? 'text-[#e45d1a]' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </svg>
      )
    },
    { 
      id: 'my-jobs', 
      label: 'मेरे काम', 
      icon: (active: boolean) => (
        <svg className={`w-8 h-8 ${active ? 'text-[#e45d1a]' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>
        </svg>
      )
    },
    { 
      id: 'profile', 
      label: 'प्रोफ़ाइल', 
      icon: (active: boolean) => (
        <div className={`p-0.5 rounded-full ${active ? 'bg-[#e45d1a]' : 'bg-gray-600'}`}>
            <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
            </svg>
        </div>
      )
    }
  ];

  return (
    <div className="absolute bottom-0 w-full bg-white border-t border-gray-100 h-24 flex items-center px-2">
      {tabs.map((tab, index) => (
        <React.Fragment key={tab.id}>
          <button 
            onClick={() => setActiveTab(tab.id)}
            className="flex-1 flex flex-col items-center justify-center space-y-1 transition-all"
          >
            <div className="mb-1">
                {tab.icon(activeTab === tab.id)}
            </div>
            <span className={`text-xs font-bold font-hindi ${activeTab === tab.id ? 'text-black' : 'text-gray-500'}`}>
              {tab.label}
            </span>
          </button>
          {index < tabs.length - 1 && (
            <div className="h-12 w-[1.5px] bg-gray-200"></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default BottomNav;
