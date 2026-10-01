import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTransactions } from '../Context/Transactioncontext';

const CATEGORIES = ['Food', 'Travel', 'Bills', 'Salary', 'Shopping', 'Health', 'Room Rent', 'Other'];

export default function EditTransaction() {
  const { id } = useParams();
  const { getById, updateTransaction } = useTransactions();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);

  useEffect(() => {
    const tx = getById(id);
    if (tx) {
      setForm({ ...tx, date: tx.date ? tx.date.slice(0, 10) : '' });
    }
  }, [id, getById]);

  const set = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTransaction(id, { ...form, amount: Number(form.amount) });
    navigate('/transactions');
  };

  const inputClass = "w-full bg-[#0a0b10] border border-zinc-700/80 text-white rounded-xl px-3.5 py-2.5 text-sm transition-all focus:outline-none focus:border-[#d9703e] focus:ring-2 focus:ring-[#d9703e]/15 font-medium";

  if (!form) {
    return (
      <div className="max-w-md mx-auto py-16 text-center">
        <div className="w-12 h-12 mx-auto rounded-2xl bg-zinc-800 flex items-center justify-center text-xl text-zinc-300 mb-3">
          🔍
        </div>
        <p className="text-zinc-300 font-medium">Loading or transaction not found.</p>
        <button
          onClick={() => navigate('/transactions')}
          className="mt-4 px-4 py-2 rounded-xl bg-[#d9703e]/20 text-[#f5a278] text-xs font-semibold"
        >
          Return to Transactions
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-5">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d9703e]/15 border border-[#d9703e]/30 text-[#f5a278] text-xs font-mono font-medium mb-2">
          <span>✎</span>
          <span>MODIFY ENTRY</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Edit Transaction</h1>
        <p className="text-sm text-zinc-300 mt-1 font-normal">Adjust entry details, amount, or categorization.</p>
      </div>

      <form 
        onSubmit={handleSubmit} 
        className="bg-[#10121a]/95 backdrop-blur-xl border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/50 space-y-5"
      >
        {/* Title */}
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-200 mb-1.5 block">
            Transaction Title
          </label>
          <input className={inputClass} value={form.title} onChange={set('title')} required />
        </div>

        {/* Amount */}
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-200 mb-1.5 block">
            Amount (₹)
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#f5a278] font-bold text-sm">
              ₹
            </span>
            <input 
              className={`${inputClass} pl-8 font-mono text-base font-bold`} 
              type="number" 
              min="0.01" 
              step="0.01" 
              value={form.amount} 
              onChange={set('amount')} 
              required 
            />
          </div>
        </div>

        {/* Type & Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-200 mb-1.5 block">
              Transaction Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setForm(p => ({ ...p, type: 'income' }))}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 border ${
                  form.type === 'income'
                    ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 shadow-sm'
                    : 'bg-[#0a0b10] border-zinc-800 text-zinc-300 hover:text-white'
                }`}
              >
                <span>↗</span> Income
              </button>
              <button
                type="button"
                onClick={() => setForm(p => ({ ...p, type: 'expense' }))}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 border ${
                  form.type === 'expense'
                    ? 'bg-[#d9703e]/20 border-[#d9703e]/50 text-[#f5a278] shadow-sm'
                    : 'bg-[#0a0b10] border-zinc-800 text-zinc-300 hover:text-white'
                }`}
              >
                <span>↘</span> Expense
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-200 mb-1.5 block">
              Category
            </label>
            <select className={inputClass} value={form.category} onChange={set('category')}>
              {CATEGORIES.map(c => <option key={c} value={c} className="bg-[#0a0b10] text-white">{c}</option>)}
            </select>
          </div>
        </div>

        {/* Date */}
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-200 mb-1.5 block">
            Transaction Date
          </label>
          <input className={inputClass} type="date" value={form.date} onChange={set('date')} required />
        </div>

        {/* Note */}
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-200 mb-1.5 block">
            Memo / Note <span className="text-zinc-400 text-[10px] lowercase font-normal">(optional)</span>
          </label>
          <textarea className={inputClass} rows={2} value={form.note || ''} onChange={set('note')} />
        </div>

        {/* Buttons */}
        <div className="pt-2 flex items-center gap-3">
          <button 
            type="submit" 
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#d9703e] to-[#b85426] hover:from-[#e27a48] hover:to-[#c86433] text-white font-bold text-sm shadow-md shadow-[#d9703e]/15 transition-all cursor-pointer"
          >
            Update Transaction
          </button>
          <button
            type="button"
            onClick={() => navigate('/transactions')}
            className="px-5 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-sm font-semibold transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}