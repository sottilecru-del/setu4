
import React from 'react';

interface LoginFormProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ value, onChange, onSubmit }) => {
  return (
    <div className="flex flex-col items-center w-full px-2">
      <label className="text-2xl font-bold mb-6 text-gray-800 font-hindi">
        अपना मोबाइल नंबर डालें
      </label>
      
      <div className="w-full relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
          <span className="text-gray-400 font-bold text-lg">+91</span>
          <div className="w-[1px] h-6 bg-gray-300"></div>
        </div>
        <input 
          type="tel"
          placeholder="00000 00000"
          value={value}
          onChange={onChange}
          maxLength={10}
          className="w-full pl-16 pr-4 py-5 border-2 border-gray-100 rounded-2xl text-xl font-bold focus:outline-none focus:border-[#e45d1a] transition-all bg-white shadow-inner tracking-[0.1em]"
        />
      </div>

      <button 
        onClick={onSubmit}
        className="w-full mt-10 py-5 bg-[#e45d1a] text-white text-3xl font-bold rounded-2xl shadow-xl hover:bg-[#c94d13] active:scale-95 transition-all font-hindi"
      >
        OTP भेजें
      </button>
      
      <p className="mt-6 text-sm text-gray-400 font-hindi text-center">
        आगे बढ़ने पर आप हमारी सेवा की शर्तों से सहमत होते हैं
      </p>
    </div>
  );
};

export default LoginForm;
