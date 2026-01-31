
import React, { useState, useRef } from 'react';
import { UserProfile } from '../App';

interface ContractorProfileScreenProps {
  user: UserProfile;
  onUpdateUser: (user: UserProfile) => void;
  onLogout: () => void;
  onPostNewJob: () => void;
}

const ContractorProfileScreen: React.FC<ContractorProfileScreenProps> = ({ user, onUpdateUser, onLogout, onPostNewJob }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone || '');
  const [address, setAddress] = useState(user.address || 'मौंड़ा, अमरा एडेरा');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    onUpdateUser({ ...user, name, phone, address });
    setIsEditing(false);
  };

  const activeJobs = [
    { role: 'मिस्त्री', rate: '₹800/दिन', workers: '5 मजदूर', status: 'चल रहा है', color: '#4b830d' },
    { role: 'मजदूर', rate: '₹600/दिन', workers: '3 मजदूर', status: 'आज का काम', color: '#e45d1a' }
  ];

  const workHistory = [
    { role: 'पेंटर', duration: '7 दिन', total: '₹21,000', status: 'पूरा हुआ', icon: '🖌️' },
    { role: 'बिजली मिस्त्री', duration: 'कांट्रेक्ट', total: '₹15,000', status: 'पूरा हुआ', icon: '⚡' }
  ];

  const reviews = [
    { text: 'पेमेंट टाइम पे मिला', icon: '😊' },
    { text: 'काम विस्तार से बताया', icon: '👍' }
  ];

  return (
    <div className="flex-1 flex flex-col bg-[#fdf8f2] h-full overflow-hidden">
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onloadend = () => onUpdateUser({ ...user, photo: reader.result as string });
            reader.readAsDataURL(file);
          }
        }} 
      />

      {/* Header Bar */}
      <div className="bg-[#e45d1a] pt-12 pb-20 px-6 flex items-center justify-between text-white relative">
        <button className="p-1">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <button 
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="bg-white/20 px-4 py-1.5 rounded-xl text-sm font-bold font-hindi shadow-inner"
        >
          {isEditing ? 'सेव करें' : 'बदलें'}
        </button>
      </div>

      <div className="flex-1 -mt-16 bg-[#fdf8f2] rounded-t-[40px] px-4 pb-24 overflow-y-auto">
        {/* Profile Info Card */}
        <div className="flex flex-col items-center -mt-12 mb-6">
          <div 
            className="relative w-28 h-28 rounded-full border-4 border-white shadow-xl overflow-hidden cursor-pointer bg-gray-100"
            onClick={() => isEditing && fileInputRef.current?.click()}
          >
            <img src={user.photo} alt="Profile" className="w-full h-full object-cover" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-8 bg-[#f59e0b] rounded-t-full border-b-2 border-black/10"></div>
          </div>
          
          <div className="mt-3 text-center">
            {isEditing ? (
              <input 
                value={name} 
                onChange={e => setName(e.target.value)}
                className="text-3xl font-bold text-gray-900 font-hindi border-b border-orange-500 bg-transparent text-center focus:outline-none"
              />
            ) : (
              <h2 className="text-3xl font-bold text-gray-900 font-hindi">{user.name}</h2>
            )}
            <p className="text-lg text-gray-600 font-hindi font-medium">ठेकेदार / काम देने वाला</p>
            
            <div className="flex items-center justify-center gap-3 mt-1 text-sm">
              <span className="flex items-center gap-1 font-bold text-orange-500">
                <span className="text-lg">★</span> {user.rating} ({user.totalRatings} रिव्यु)
              </span>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <span className="text-gray-500 font-hindi flex items-center gap-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#e45d1a"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/></svg>
                {address}
              </span>
            </div>
          </div>
        </div>

        {/* Edit Fields (When Editing) */}
        {isEditing && (
          <div className="space-y-4 mb-6 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 animate-in fade-in zoom-in duration-200">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-400 font-hindi">मोबाइल नंबर</label>
              <input 
                value={phone} 
                onChange={e => setPhone(e.target.value)}
                className="text-lg font-bold text-gray-800 border-b border-gray-100 py-1"
                placeholder="नंबर डालें"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-400 font-hindi">पता</label>
              <input 
                value={address} 
                onChange={e => setAddress(e.target.value)}
                className="text-lg font-bold text-gray-800 border-b border-gray-100 py-1 font-hindi"
                placeholder="पता डालें"
              />
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          <div className="bg-white rounded-xl p-2 flex flex-col items-center shadow-sm border border-gray-100 text-center">
             <div className="flex items-center justify-center gap-1 mb-1">
                <span className="text-sm">💼</span>
                <span className="text-[9px] font-bold text-gray-500 uppercase tracking-tighter">Jobs Post किये</span>
             </div>
             <span className="text-xl font-bold text-gray-900">{user.jobsPosted || 42}</span>
          </div>
          <div className="bg-white rounded-xl p-2 flex flex-col items-center shadow-sm border border-gray-100 text-center">
             <div className="flex items-center justify-center gap-1 mb-1">
                <span className="text-sm">👷</span>
                <span className="text-[9px] font-bold text-gray-500 uppercase tracking-tighter">Workers Hired</span>
             </div>
             <span className="text-xl font-bold text-gray-900">{user.workersHired || 85}</span>
          </div>
          <div className="bg-white rounded-xl p-2 flex flex-col items-center shadow-sm border border-gray-100 text-center">
             <div className="flex items-center justify-center gap-1 mb-1">
                <span className="text-sm">₹</span>
                <span className="text-[9px] font-bold text-gray-500 uppercase tracking-tighter">Total Payment</span>
             </div>
             <span className="text-sm font-bold text-gray-900 mt-0.5">₹{(user.totalPayment || 425000).toLocaleString()}</span>
          </div>
        </div>

        {/* Active Jobs */}
        <section className="mb-6">
          <h3 className="text-xl font-bold text-gray-900 font-hindi mb-3 px-1">एकटिव काम</h3>
          <div className="grid grid-cols-2 gap-3">
            {activeJobs.map((job, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-50 flex flex-col">
                <div className="p-3 flex-1">
                  <div className="flex items-start gap-2 mb-1">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm flex-shrink-0">👷</div>
                    <div>
                      <p className="text-lg font-bold text-gray-900 font-hindi leading-tight">{job.role}</p>
                      <p className="text-xs font-bold text-gray-500">{job.rate}</p>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-gray-600 font-hindi ml-10 mt-1">{job.workers}</p>
                </div>
                <div 
                  className="py-1.5 px-3 text-white text-xs font-bold font-hindi flex items-center justify-center gap-1"
                  style={{ backgroundColor: job.color }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  {job.status}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* History */}
        <section className="mb-6 border-t border-gray-100 pt-4">
          <h3 className="text-xl font-bold text-gray-900 font-hindi mb-3 px-1">काम का इतिहास</h3>
          <div className="space-y-2">
            {workHistory.map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-3 flex items-center justify-between shadow-sm border border-gray-50">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-xl">{item.icon}</div>
                   <div>
                      <p className="text-lg font-bold text-gray-800 font-hindi">{item.role} - {item.duration}</p>
                      <p className="text-sm font-bold text-gray-500">{item.total}</p>
                   </div>
                </div>
                <span className="text-xs font-bold text-gray-400 font-hindi">{item.status}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Reviews */}
        <section className="mb-8 border-t border-gray-100 pt-4">
          <h3 className="text-xl font-bold text-gray-900 font-hindi mb-3 px-1">मजदूरो के रिव्यु</h3>
          <div className="space-y-2">
            {reviews.map((rev, i) => (
              <div key={i} className="bg-white rounded-xl p-3 flex items-center gap-3 shadow-sm border border-gray-50">
                 <span className="text-xl">{rev.icon}</span>
                 <p className="text-lg font-bold text-gray-800 font-hindi italic">"{rev.text}"</p>
              </div>
            ))}
          </div>
        </section>

        {/* Primary Action Button */}
        <button 
          onClick={onPostNewJob}
          className="w-full bg-[#e45d1a] text-white py-5 rounded-2xl flex items-center justify-center gap-3 shadow-xl active:scale-[0.98] transition-all mb-6"
        >
          <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xl font-bold leading-none pb-0.5">+</div>
          <span className="text-2xl font-bold font-hindi">नया काम पोस्ट करें</span>
        </button>

        {/* Sub Action Buttons Grid */}
        <div className="grid grid-cols-2 gap-3 mb-8">
           <button className="bg-white border border-gray-100 p-4 rounded-2xl flex flex-col gap-2 shadow-sm active:bg-gray-50 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4b5563" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
              <span className="text-[10px] font-bold text-gray-600 uppercase">Payment Reports</span>
           </button>
           <button className="bg-white border border-gray-100 p-4 rounded-2xl flex flex-col gap-2 shadow-sm active:bg-gray-50 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4b5563" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              <span className="text-[10px] font-bold text-gray-600 uppercase">Support</span>
           </button>
           <button className="bg-white border border-gray-100 p-4 rounded-2xl flex flex-col gap-2 shadow-sm active:bg-gray-50 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4b5563" strokeWidth="2.5"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
              <span className="text-[10px] font-bold text-gray-600 uppercase">Settings</span>
           </button>
           <button onClick={onLogout} className="bg-white border border-red-50 p-4 rounded-2xl flex flex-col gap-2 shadow-sm active:bg-red-50 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ee2d0e" strokeWidth="2.5"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>
              <span className="text-[10px] font-bold text-[#ee2d0e] uppercase">Logout</span>
           </button>
        </div>
      </div>
    </div>
  );
};

export default ContractorProfileScreen;
