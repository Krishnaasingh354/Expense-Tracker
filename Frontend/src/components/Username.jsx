import { useState } from 'react';
import { useDarkMode } from '../Context/DarkModeContext.jsx';

const REGEX = /^[a-zA-Z0-9_]{3,20}$/;

export default function Username({ onSubmit }) {
  const [value, setValue] = useState('');
  const { darkMode, toggleDarkMode } = useDarkMode();

  const isValid = REGEX.test(value);
  const showError = value.length > 0 && !isValid;

  const handleChange = (e) => {
      let val = e.target.value;
      if (val.length > 0) {
          val = val.charAt(0).toUpperCase() + val.slice(1);
      }
      setValue(val);
  };

  const submitUsername = () => {
    if (isValid) {
      onSubmit(value);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-50 dark:bg-slate-900 z-50 p-4 transition-colors duration-300">
      
      {/* Theme Toggle Button at top right */}
      <button
        onClick={toggleDarkMode}
        className="absolute top-6 right-6 flex items-center justify-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 px-4 py-2 rounded-full text-sm font-medium transition-all shadow-sm hover:shadow-md"
      >
        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>

      <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-sm p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 dark:border-slate-700 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
        
        <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center mb-6 text-2xl shadow-sm">
          👋
        </div>

        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
          Welcome to ExpenseTracker
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
          Please choose a username to set up your dashboard.
        </p>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Username
          </label>
          <div className="relative">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-slate-400 font-medium">@</span>
            </div>
            <input
              type="text"
              value={value}
              onChange={handleChange}
              onKeyDown={(e) => e.key === 'Enter' && isValid && submitUsername()}
              placeholder="YourName"
              maxLength={20}
              className={`w-full pl-8 pr-10 py-2.5 bg-white dark:bg-slate-700 border rounded-xl text-sm transition-all outline-none text-slate-900 dark:text-white
                ${showError ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 dark:border-red-500/50' 
                : isValid ? 'border-emerald-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-emerald-500/50' 
                : 'border-slate-200 dark:border-slate-600 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10'}
              `}
            />
            {isValid && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-emerald-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </div>
          
          <div className="h-4 mt-1">
             {showError && (
               <p className="text-xs text-red-500 font-medium transition-all">Letters, numbers, underscores only (3-20 chars).</p>
             )}
          </div>
        </div>

        <button
          onClick={submitUsername}
          disabled={!isValid}
          className={`mt-6 w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2
            ${isValid 
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20 hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/30' 
              : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed border border-slate-200 dark:border-slate-700'
            }
          `}
        >
          Get Started
          <svg className={`w-4 h-4 transition-transform ${isValid ? 'translate-x-0.5' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>

      </div>
    </div>
  );
}