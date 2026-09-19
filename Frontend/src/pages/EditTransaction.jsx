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
    if (tx) setForm({ ...tx, date: tx.date.slice(0, 10) });
  }, [id]);

  const set = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTransaction(id, { ...form, amount: Number(form.amount) });
    navigate('/transactions');
  };

  if (!form) return <p className="text-gray-400">Transaction not found.</p>;

  const inputClass = "w-full border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400";

  return (
    <div className="max-w-md space-y-4">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Edit Transaction</h1>
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 shadow-sm space-y-4">
        <div>
          <label className="text-sm text-gray-500 dark:text-gray-400 mb-1 block">Title</label>
          <input className={inputClass} value={form.title} onChange={set('title')} required />
        </div>
        <div>
          <label className="text-sm text-gray-500 dark:text-gray-400 mb-1 block">Amount (₹)</label>
          <input className={inputClass} type="number" min="0.01" step="0.01" value={form.amount} onChange={set('amount')} required />
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
          <textarea className={inputClass} rows={2} value={form.note} onChange={set('note')} />
        </div>
        <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition">
          Update Transaction
        </button>
      </form>
    </div>
  );
}