import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import AddTransaction from './pages/AddTransaction';
import EditTransaction from './pages/EditTransaction';
import Username from './components/Username';
import OrangeMatteBackground from './components/OrangeMatteBackground';
import { TransactionProvider } from './Context/Transactioncontext';

export default function App() {
  const [username, setUsername] = useState(() => {
    return localStorage.getItem('fin_username') || '';
  });

  const handleSetUsername = (name) => {
    localStorage.setItem('fin_username', name);
    setUsername(name);
  };

  const handleLogout = () => {
    localStorage.removeItem('fin_username');
    setUsername('');
  };

  return (
    <BrowserRouter>
      <TransactionProvider username={username}>
        <div className="min-h-screen bg-[#090a0e] text-slate-100 overflow-x-hidden relative selection:bg-[#d9703e]/30 selection:text-[#fed7aa] font-sans">
          {!username ? (
            <Username onSubmit={handleSetUsername} />
          ) : (
            <>
              <OrangeMatteBackground />
              <div className="relative z-10 w-full min-h-screen flex flex-col">
                <Navbar username={username} onLogout={handleLogout} />
                <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8">
                  <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="/dashboard" element={<Dashboard username={username} />} />
                    <Route path="/transactions" element={<Transactions />} />
                    <Route path="/add" element={<AddTransaction />} />
                    <Route path="/edit/:id" element={<EditTransaction />} />
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                  </Routes>
                </main>
              </div>
            </>
          )}
        </div>
      </TransactionProvider>
    </BrowserRouter>
  );
}