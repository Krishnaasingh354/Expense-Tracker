import { useState } from 'react';
import { useTransactions } from '../Context/Transactioncontext';
import TransactionCard from '../components/TransactionCard';
import { Link } from 'react-router-dom';

export default function Transactions() {
  const { transactions } = useTransactions();
  const [filterType, setFilterType] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = transactions
    .filter(t => {
      if (filterType === 'income') return t.type === 'income';
      if (filterType === 'expense') return t.type === 'expense';
      return true;
    })
    .filter(t => {
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        t.title?.toLowerCase().includes(q) ||
        t.category?.toLowerCase().includes(q) ||
        t.note?.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d9703e]/15 border border-[#d9703e]/30 text-[#f5a278] text-xs font-mono font-medium mb-2">
            <span>💳</span>
            <span>TRANSACTION REPOSITORY</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Transaction History
          </h1>
          <p className="text-sm text-zinc-300 mt-1 font-normal">
            Browse, search, edit, or filter your entire financial ledger.
          </p>
        </div>

        <Link
          to="/add"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#d9703e] to-[#b85426] hover:from-[#e27a48] hover:to-[#c86433] text-white text-sm font-semibold shadow-sm transition-all self-start sm:self-auto"
        >
          <span>+</span>
          <span>Add Transaction</span>
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#10121a]/95 border border-zinc-800 p-3 rounded-2xl">
        {/* Search input */}
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search by title, category, note..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#090a0f] border border-zinc-700/80 rounded-xl text-xs sm:text-sm text-white placeholder-zinc-400 focus:outline-none focus:border-[#d9703e]"
          />
        </div>

        {/* Type Filter Buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-[#090a0f] rounded-xl border border-zinc-800">
          {['all', 'income', 'expense'].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                filterType === t
                  ? 'bg-[#d9703e] text-white shadow-sm'
                  : 'text-zinc-300 hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Transactions List */}
      <div className="space-y-2.5">
        {filtered.length === 0 ? (
          <div className="bg-[#10121a]/60 border border-dashed border-zinc-800 rounded-3xl py-16 px-4 text-center">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#d9703e]/15 border border-[#d9703e]/30 flex items-center justify-center text-2xl text-[#f5a278] mb-3">
              📑
            </div>
            <p className="text-base text-zinc-200 font-bold">No transactions found</p>
            <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto font-medium">
              {search || filterType !== 'all' 
                ? 'Try adjusting your search criteria or filter type.' 
                : 'Your ledger is currently empty. Record your first transaction to get started.'}
            </p>
            <Link
              to="/add"
              className="mt-5 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#d9703e] to-[#b85426] text-white text-xs font-semibold shadow-sm"
            >
              + Add Transaction Now
            </Link>
          </div>
        ) : (
          filtered.map(t => <TransactionCard key={t._id} transaction={t} showActions />)
        )}
      </div>

    </div>
  );
}