import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import AddTransaction from './pages/AddTransaction';
import EditTransaction from './pages/EditTransaction';
import Username from './components/Username';
const AuroraBackground = () => (
   <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 transition-opacity duration-700">
      <div className="absolute inset-0 opacity-40 dark:opacity-20">
        <div className="absolute -top-[30%] -left-[20%] w-[80%] h-[80%] bg-emerald-400 dark:bg-emerald-500 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[150px] animate-[pulse_12s_ease-in-out_infinite]"></div>
        <div className="absolute top-[10%] -right-[30%] w-[90%] h-[90%] bg-teal-300 dark:bg-teal-400 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[150px] animate-[pulse_16s_ease-in-out_infinite_reverse]"></div>
        <div className="absolute -bottom-[40%] left-[20%] w-[70%] h-[70%] bg-yellow-200 dark:bg-yellow-500/50 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[150px] animate-[pulse_14s_ease-in-out_infinite]"></div>
      </div>
   </div>
);

export default function App() {
  const [username, setUsername] = useState('');

  if (!username) {
    return <Username onSubmit={setUsername} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 overflow-hidden relative selection:bg-emerald-500/30 transition-colors duration-300">
      {/* Minimalist Breathing Aurora Background */}
      <AuroraBackground />

      <div className="relative z-10 w-full h-full">
        <BrowserRouter>
          <Navbar username={username} />
          <div className="max-w-5xl mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard username={username} />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/add" element={<AddTransaction />} />
              <Route path="/edit/:id" element={<EditTransaction />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </div>
  );
}