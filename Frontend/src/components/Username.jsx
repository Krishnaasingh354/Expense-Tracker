import { useState, useEffect } from 'react';
import axios from 'axios';
import Scene3D from './Scene3D';

const REGEX = /^[a-zA-Z0-9_]{3,20}$/;

export default function Username({ onSubmit }) {
  const [value, setValue] = useState('');
  const [touched, setTouched] = useState(false);
  const [backendOnline, setBackendOnline] = useState(null);

  const trimmed = value.trim();
  const isValid = REGEX.test(trimmed);
  const showError = touched && trimmed.length > 0 && !isValid;

  // Test backend visibility on load
  useEffect(() => {
    let isMounted = true;
    axios.get('/api/health', { timeout: 3000 })
      .then(res => {
        if (isMounted && res.data?.status === 'ok') {
          setBackendOnline(true);
        }
      })
      .catch(() => {
        if (isMounted) setBackendOnline(false);
      });
    return () => { isMounted = false; };
  }, []);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    setTouched(true);
    if (isValid) {
      onSubmit(trimmed);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 bg-[#090a0e] text-slate-100 selection:bg-[#d9703e]/30 selection:text-[#fed7aa] overflow-hidden">
      
      {/* 3D Animation Full-Viewport Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <Scene3D className="w-full h-full opacity-65" interactive={false} />
        {/* Subtle radial vignette gradient over 3D to ensure text readability */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(9,10,14,0.45)_0%,#090a0e_85%)] pointer-events-none" />
      </div>

      {/* Centered Login Card */}
      <div className="relative z-10 w-full max-w-md my-auto">
        <div className="bg-[#10121a]/85 backdrop-blur-2xl rounded-3xl p-8 sm:p-10 border border-zinc-800 shadow-[0_25px_60px_rgba(0,0,0,0.7)] hover:border-[#d9703e]/40 transition-colors duration-300">
          
          {/* Brand Header */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#d9703e] to-[#b85426] p-[1.5px] shadow-lg shadow-[#d9703e]/20 mb-3.5">
              <div className="w-full h-full bg-[#0d0e14] rounded-2xl flex items-center justify-center text-2xl font-black text-[#f5a278]">
                ₹
              </div>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Welcome to FinTrack
            </h1>
            <p className="text-sm text-zinc-400 mt-1.5 max-w-xs leading-relaxed">
              Enter your username to access your expense tracker.
            </p>

            {/* Live Backend Visibility Badge */}
            <div className="mt-3.5 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141624]/90 border border-zinc-800 text-[11px] font-mono text-zinc-300">
              <span className={`w-2 h-2 rounded-full ${backendOnline ? 'bg-emerald-400 animate-pulse' : backendOnline === false ? 'bg-red-400' : 'bg-amber-400 animate-ping'}`} />
              <span>
                {backendOnline === true ? 'BACKEND :8000 LIVE' : backendOnline === false ? 'BACKEND OFFLINE' : 'CHECKING BACKEND...'}
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label 
                  htmlFor="username-input" 
                  className="text-xs font-semibold text-zinc-300 uppercase tracking-wider"
                >
                  Username
                </label>
                <span className="text-[11px] font-mono text-zinc-500">
                  {trimmed.length}/20
                </span>
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500 font-medium text-sm">
                  @
                </div>
                
                <input
                  id="username-input"
                  type="text"
                  value={value}
                  onChange={handleChange}
                  onBlur={() => setTouched(true)}
                  placeholder="e.g. John"
                  maxLength={20}
                  autoFocus
                  autoComplete="username"
                  spellCheck={false}
                  className={`w-full pl-9 pr-10 py-3.5 bg-[#090a0f]/90 border rounded-2xl text-sm font-medium text-white placeholder-zinc-500 outline-none transition-all duration-200
                    ${showError
                      ? 'border-red-500/80 focus:border-red-500 focus:ring-4 focus:ring-red-500/10'
                      : isValid
                      ? 'border-[#d9703e]/80 focus:border-[#d9703e] focus:ring-4 focus:ring-[#d9703e]/15'
                      : 'border-zinc-800 focus:border-[#d9703e]/70 focus:ring-4 focus:ring-[#d9703e]/10 hover:border-zinc-700'
                    }
                  `}
                />

                {trimmed.length > 0 && (
                  <button
                    type="button"
                    onClick={() => { setValue(''); setTouched(false); }}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-500 hover:text-zinc-300 transition-colors"
                  >
                    <span className="text-xs bg-zinc-800 hover:bg-zinc-700 rounded-full w-5 h-5 flex items-center justify-center">✕</span>
                  </button>
                )}
              </div>

              {/* Validation helper */}
              <div className="mt-1.5 min-h-[18px]">
                {showError ? (
                  <p className="text-xs text-red-400 font-medium flex items-center gap-1.5">
                    <span>⚠️</span> 3–20 characters (letters, numbers, or underscores)
                  </p>
                ) : (
                  <p className="text-[11px] text-zinc-500">
                    Your transactions will be saved under this username.
                  </p>
                )}
              </div>
            </div>

            {/* Quick Submit Button */}
            <button
              type="submit"
              disabled={!isValid}
              className={`w-full py-3.5 px-5 rounded-2xl text-sm font-semibold tracking-wide transition-all duration-200 flex items-center justify-center gap-2 group
                ${isValid
                  ? 'bg-gradient-to-r from-[#d9703e] to-[#b85426] hover:from-[#e27a48] hover:to-[#c96231] text-white shadow-lg shadow-[#d9703e]/20 hover:scale-[1.01] active:scale-[0.99] cursor-pointer'
                  : 'bg-zinc-800/80 text-zinc-500 border border-zinc-800 cursor-not-allowed'
                }
              `}
            >
              <span>Continue to Dashboard</span>
              <svg 
                className={`w-4 h-4 transition-transform duration-200 ${isValid ? 'group-hover:translate-x-1' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </form>

          {/* Footer note */}
          <div className="mt-6 pt-5 border-t border-zinc-800/80 text-center">
            <p className="text-xs text-zinc-500">
              Instant access • No password required
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}