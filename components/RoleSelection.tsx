
import React from 'react';

interface RoleSelectionProps {
  onSelect: (role: string) => void;
  onBack: () => void;
}

const RoleSelection: React.FC<RoleSelectionProps> = ({ onSelect, onBack }) => {
  const roles = [
    { id: 'worker', title: 'मज़दूर', icon: '👷', color: '#4b830d' },
    { id: 'contractor', title: 'ठेकेदार', icon: '📋', color: '#e45d1a' },
    { id: 'employer', title: 'काम देने वाला', icon: '🏠', color: '#9e3122' }
  ];

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="bg-[#e45d1a] pt-12 pb-4 px-6 flex items-center justify-center text-white relative shadow-md">
        <button onClick={onBack} className="absolute left-6 p-1">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <h1 className="text-2xl font-bold font-hindi tracking-wide">पंजीकरण</h1>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10 space-y-8">
        <h2 className="text-3xl font-bold font-hindi text-gray-800 text-center">
          आप कौन हैं?
        </h2>

        <div className="w-full space-y-4">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => onSelect(role.id)}
              className="w-full bg-white border-2 border-gray-100 rounded-2xl p-6 flex items-center gap-6 shadow-sm hover:border-[#e45d1a] active:scale-[0.98] transition-all text-left"
            >
              <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center text-4xl shadow-inner">
                {role.icon}
              </div>
              <div className="flex-1">
                <span className="text-3xl font-bold font-hindi text-gray-900">
                  {role.title}
                </span>
              </div>
              <div className="text-gray-300">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
