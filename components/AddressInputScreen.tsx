
import React, { useState } from 'react';

interface AddressInputScreenProps {
  onAddressSubmit: (address: string, coords: { lat: number, lng: number } | null) => void;
  onBack: () => void;
}

const AddressInputScreen: React.FC<AddressInputScreenProps> = ({ onAddressSubmit, onBack }) => {
  const [address, setAddress] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [coords, setCoords] = useState<{ lat: number, lng: number } | null>(null);

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("लोकेशन सपोर्ट नहीं है");
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setCoords({ lat: latitude, lng: longitude });
        setAddress("मौंड़ा, अमरा एडेरा (नजदीकी लोकेशन)");
        setIsLocating(false);
      },
      (err) => {
        console.error(err);
        setIsLocating(false);
        alert("लोकेशन नहीं मिल पाई, कृपया पता लिखें");
      }
    );
  };

  return (
    <div className="flex-1 flex flex-col bg-[#fdf8f2]">
      <div className="bg-[#e45d1a] pt-12 pb-4 px-6 flex items-center justify-center text-white relative shadow-md">
        <button onClick={onBack} className="absolute left-6 p-1">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <h1 className="text-2xl font-bold font-hindi tracking-wide">पंजीकरण</h1>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold font-hindi text-gray-800">आपका पता?</h2>
          <p className="text-gray-500 font-hindi">जहाँ काम होना है या आप रहते हैं</p>
        </div>

        <div className="w-full space-y-4">
          <button 
            onClick={handleGetLocation}
            className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 border-2 ${isLocating ? 'border-orange-500 bg-orange-50' : 'border-gray-200 bg-white'} transition-all`}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={isLocating ? "#e45d1a" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={isLocating ? 'animate-spin' : ''}>
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span className={`text-xl font-bold font-hindi ${isLocating ? 'text-[#e45d1a]' : 'text-gray-700'}`}>
              {isLocating ? 'खोज रहे हैं...' : 'लाइव लोकेशन लें'}
            </span>
          </button>

          <div className="relative">
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="यहाँ पता लिखें..."
              className="w-full px-6 py-5 border-2 border-gray-100 rounded-2xl text-xl font-bold focus:outline-none focus:border-[#e45d1a] transition-all bg-white shadow-inner font-hindi min-h-[120px]"
            />
          </div>

          <button
            onClick={() => address && onAddressSubmit(address, coords)}
            disabled={!address}
            className={`w-full py-5 text-3xl font-bold rounded-2xl shadow-xl transition-all font-hindi ${
              address ? 'bg-[#e45d1a] text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            पूरा करें
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressInputScreen;
