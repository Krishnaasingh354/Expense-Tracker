import { NavLink } from 'react-router-dom';
import { useTransactions } from '../Context/Transactioncontext';

export default function Navbar({ username, onLogout }) {
  const { backendStatus } = useTransactions();

  const linkClass = ({ isActive }) =>
    `px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
      isActive
        ? 'bg-[#d9703e]/20 text-[#f5a278] border border-[#d9703e]/40 font-semibold'
        : 'text-zinc-300 hover:text-white hover:bg-zinc-800/60 border border-transparent'
    }`;

  return (
    <nav className="sticky top-0 z-40 bg-[#0c0d13]/95 backdrop-blur-xl border-b border-zinc-800 px-4 sm:px-6 py-3.5 shadow-lg shadow-black/50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <NavLink to="/dashboard" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#d9703e] to-[#b85426] p-[1px] shadow-sm shadow-[#d9703e]/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0d0e14] rounded-xl flex items-center justify-center text-sm font-black text-[#f5a278]">
                ₹
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-1.5">
                FinTrack <span className="text-[10px] px-1.5 py-0.2 rounded-md font-mono bg-[#d9703e]/20 text-[#f5a278] border border-[#d9703e]/30 font-semibold">3D</span>
              </span>
            </div>
          </NavLink>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-1 sm:gap-2">
          <NavLink to="/dashboard" className={linkClass}>
            📊 Dashboard
          </NavLink>
          <NavLink to="/transactions" className={linkClass}>
            💳 Transactions
          </NavLink>
          <NavLink 
            to="/add" 
            className={({ isActive }) => 
              `px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                isActive
                  ? 'bg-gradient-to-r from-[#d9703e] to-[#b85426] text-white shadow-sm font-semibold'
                  : 'bg-[#d9703e]/15 hover:bg-[#d9703e]/25 text-[#f5a278] border border-[#d9703e]/30'
              }`
            }
          >
            <span>+</span>
            <span className="hidden xs:inline">Add</span>
          </NavLink>
        </div>

        {/* Right Section: Backend Status, User Badge, and Instant Logout */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Visible Backend Connection Status */}
          <div 
            className={`hidden md:flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono border transition-all ${
              backendStatus === 'connected'
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : backendStatus === 'checking'
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                : 'bg-red-500/10 border-red-500/30 text-red-400'
            }`}
            title="Backend Express & MongoDB API on Port 8000"
          >
            <span className={`w-2 h-2 rounded-full ${
              backendStatus === 'connected' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400 animate-ping'
            }`} />
            <span>{backendStatus === 'connected' ? 'API :8000 ONLINE' : 'API CONNECTING'}</span>
          </div>

          {username && (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#141622] border border-zinc-800 text-xs">
                <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[#d9703e] to-[#b85426] flex items-center justify-center text-[10px] font-bold text-white">
                  {username.charAt(0).toUpperCase()}
                </div>
                <span className="text-zinc-200 font-semibold hidden sm:inline">{username}</span>
              </div>

              {onLogout && (
                <button
                  onClick={onLogout}
                  title="Log out of session"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-800/70 hover:bg-red-500/20 text-zinc-300 hover:text-red-300 border border-zinc-700/60 hover:border-red-500/40 text-xs font-semibold transition-all cursor-pointer shadow-sm active:scale-95"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span className="hidden xs:inline">Logout</span>
                </button>
              )}
            </div>
          )}
        </div>

      </div>
    </nav>
  );
}