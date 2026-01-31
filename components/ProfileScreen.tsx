
import React, { useState, useRef } from 'react';
import { UserProfile } from '../App';

interface ProfileScreenProps {
  user: UserProfile | null;
  onUpdateUser: (user: UserProfile) => void;
  onLogout: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ user, onUpdateUser, onLogout }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user?.name || '');
  const [editedRoles, setEditedRoles] = useState<string[]>(user?.roles || []);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!user) return null;

  const handleSave = () => {
    onUpdateUser({
      ...user,
      name: editedName,
      roles: editedRoles
    });
    setIsEditing(false);
  };

  const handlePhotoClick = () => {
    if (isEditing) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdateUser({
          ...user,
          photo: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleRole = (role: string) => {
    if (editedRoles.includes(role)) {
      setEditedRoles(editedRoles.filter(r => r !== role));
    } else {
      setEditedRoles([...editedRoles, role]);
    }
  };

  const availableRoles = ['मज़दूर', 'मिस्त्री', 'प्लंबर', 'पेंटर', 'इलेक्ट्रीशियन'];

  return (
    <div className="flex-1 flex flex-col bg-[#fdf8f2]">
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={handleFileChange} 
      />

      {/* Header */}
      <div className="bg-[#e45d1a] pt-12 pb-4 px-6 flex items-center justify-between text-white relative shadow-md">
        <button className="p-1 opacity-0 pointer-events-none">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <h1 className="text-2xl font-bold font-hindi tracking-wide">प्रोफाइल</h1>
        <button 
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="bg-white/20 px-3 py-1 rounded-lg text-sm font-bold font-hindi"
        >
          {isEditing ? 'सेव करें' : 'बदलें'}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-24">
        {/* User Card */}
        <div className="bg-white rounded-2xl p-4 flex gap-4 shadow-sm border border-gray-100 relative">
          <div 
            className={`relative w-20 h-20 flex-shrink-0 cursor-pointer ${isEditing ? 'ring-4 ring-[#e45d1a] ring-offset-2' : ''}`}
            onClick={handlePhotoClick}
          >
            <img 
              src={user.photo} 
              alt="Profile" 
              className="w-full h-full rounded-full bg-[#fdf8f2] object-cover" 
            />
            <div className="absolute top-0 left-2 w-8 h-4 bg-yellow-400 rounded-t-full border border-black/10"></div>
            {isEditing && (
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center text-white">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
              </div>
            )}
          </div>
          
          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-2">
                <input 
                  type="text" 
                  value={editedName} 
                  onChange={(e) => setEditedName(e.target.value)}
                  className="w-full border-b-2 border-gray-200 focus:border-[#e45d1a] outline-none text-xl font-bold font-hindi py-1"
                  placeholder="नाम लिखें"
                />
                <div className="flex flex-wrap gap-1">
                  {availableRoles.map(role => (
                    <button
                      key={role}
                      onClick={() => toggleRole(role)}
                      className={`text-xs px-2 py-1 rounded-full border transition-colors font-hindi ${editedRoles.includes(role) ? 'bg-[#e45d1a] text-white border-[#e45d1a]' : 'bg-white text-gray-500 border-gray-200'}`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold text-gray-900 font-hindi">{user.name}</h2>
                  <span className="bg-[#4b830d] text-white text-[10px] font-bold px-1.5 py-0.5 rounded leading-none">{user.level}</span>
                </div>
                <p className="text-lg text-gray-600 font-hindi -mt-1">{user.roles.join(', ')}</p>
                <div className="flex items-center gap-1 mt-1">
                  <div className="flex text-orange-400">
                    {[1, 2, 3, 4, 5].map(star => (
                      <span key={star} className={star <= user.rating ? 'text-orange-400' : 'text-gray-300'}>★</span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 font-hindi">({user.totalRatings} रेटिंग)</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
            <p className="text-lg font-bold text-gray-800 font-hindi">मेरी कमाई</p>
            <p className="text-2xl font-bold text-[#8b4513]">₹ {user.earnings.toLocaleString('en-IN')}</p>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
            <p className="text-lg font-bold text-gray-800 font-hindi">कुल काम</p>
            <p className="text-2xl font-bold text-[#e45d1a]">{user.workDays} दिन</p>
          </div>
        </div>

        {/* Action Button */}
        <button className="w-full bg-[#4b830d] hover:bg-[#3d6b0a] text-white rounded-xl py-3.5 px-6 flex items-center justify-center gap-3 shadow-lg active:scale-[0.98] transition-all">
          <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center text-[#4b830d] font-bold text-lg">
            $
          </div>
          <span className="text-2xl font-bold font-hindi">पैसे लें ₹ {Math.min(user.earnings, 3000)}</span>
        </button>

        {/* History Section */}
        <div className="pt-2">
          <h3 className="text-xl font-bold text-gray-900 font-hindi mb-3">काम का इतिहास</h3>
          <div className="space-y-3">
            {user.workHistory.length > 0 ? (
              user.workHistory.map((item) => (
                <div key={item.id} className="bg-white rounded-xl p-3 flex gap-3 shadow-sm border border-gray-50 items-center">
                  <div className="relative w-12 h-12 flex-shrink-0">
                    <img 
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.role}&top=shortHair&clothingColor=f59e0b`} 
                      alt="Icon" 
                      className="w-full h-full rounded-full bg-gray-100" 
                    />
                    <div className="absolute top-0 left-1 w-4 h-2 bg-yellow-400 rounded-t-full border border-black/5"></div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-gray-900 font-hindi">{item.role}</span>
                      <span className="text-lg font-bold text-gray-900">{item.price}</span>
                    </div>
                    <div className="flex text-sm text-gray-400 font-hindi divide-x divide-gray-300">
                      <span className="pr-2">{item.location}</span>
                      <span className="pl-2">{item.distance}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className={`text-sm font-bold px-3 py-0.5 rounded text-white font-hindi ${item.status === 'completed' ? 'bg-[#4b830d]' : 'bg-[#e45d1a]'}`}>
                      {item.status === 'completed' ? 'साफ' : 'निपट'}
                    </div>
                    <p className="text-sm font-bold text-gray-600 font-hindi mt-1">{item.days}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-xl p-8 text-center border border-dashed border-gray-300">
                <p className="text-gray-400 font-hindi">अभी तक कोई काम नहीं किया है</p>
              </div>
            )}
          </div>
        </div>

        {/* Logout Button */}
        <div className="pt-4 pb-8">
           <button 
             onClick={onLogout}
             className="w-full bg-white border-2 border-red-100 text-[#ee2d0e] rounded-xl py-3 font-bold font-hindi shadow-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2"
           >
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
               <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
               <polyline points="16 17 21 12 16 7"></polyline>
               <line x1="21" y1="12" x2="9" y2="12"></line>
             </svg>
             लॉगआउट करें
           </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
