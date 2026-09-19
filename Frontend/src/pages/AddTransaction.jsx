import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTransactions } from '../Context/Transactioncontext';

const CATEGORIES = ['Food', 'Travel', 'Bills', 'Salary', 'Shopping', 'Health', 'Room Rent', 'Other'];

export default function AddTransaction() {
  const { addTransaction } = useTransactions();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '', amount: '', type: 'expense', category: 'Food', date: '', note: ''
  });

  const set = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    addTransaction({ ...form, amount: Number(form.amount) });
    navigate('/transactions');
  };

  const inputClass = "w-full border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400";

  return (
    <div className="max-w-md space-y-4">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Add Transaction</h1>
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 shadow-sm space-y-4">
        <div>
          <label className="text-sm text-gray-500 dark:text-gray-400 mb-1 block">Title</label>
          <input className={inputClass} placeholder="e.g. Groceries" value={form.title} onChange={set('title')} required />
        </div>
        <div>
          <label className="text-sm text-gray-500 dark:text-gray-400 mb-1 block">Amount (₹)</label>
          <input className={inputClass} type="number" min="0.01" step="0.01" placeholder="0.00" value={form.amount} onChange={set('amount')} required />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm text-gray-500 dark:text-gray-400 mb-1 block">Type</label>
            <select className={inputClass} value={form.type} onChange={set('type')}>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-500 dark:text-gray-400 mb-1 block">Category</label>
            <select className={inputClass} value={form.category} onChange={set('category')}>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="text-sm text-gray-500 dark:text-gray-400 mb-1 block">Date</label>
          <input className={inputClass} type="date" value={form.date} onChange={set('date')} required />
        </div>
        <div>
          <label className="text-sm text-gray-500 dark:text-gray-400 mb-1 block">Note (optional)</label>
          <textarea className={inputClass} rows={2} placeholder="Any extra details..." value={form.note} onChange={set('note')} />
        </div>
        <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition">
          Add Transaction
        </button>
      </form>
    </div>
  );
}