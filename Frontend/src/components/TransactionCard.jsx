import { Link } from 'react-router-dom';
import { useTransactions } from '../Context/Transactioncontext.jsx';

export default function TransactionCard({ transaction, showActions = false }) {
  const { deleteTransaction } = useTransactions();
  const { _id, title, amount, type, category, date } = transaction;

  const handleDelete = () => {
    if (window.confirm('Delete this transaction?')) deleteTransaction(_id);
  };

  return (
    <div className="flex justify-between items-center bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4 shadow-sm">
      <div>
        <p className="font-medium text-gray-800 dark:text-white">{title}</p>
        <p className="text-xs text-gray-400 mt-0.5">
          {category} · {new Date(date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <span className={`font-bold text-base ${type === 'income' ? 'text-green-600' : 'text-red-500'}`}>
          {type === 'income' ? '+' : '-'}₹{Number(amount).toLocaleString('en-IN')}
        </span>
        {showActions && (
          <div className="flex gap-2 text-sm">
            <Link to={`/edit/${_id}`} className="text-blue-500 hover:underline">Edit</Link>
            <button onClick={handleDelete} className="text-red-400 hover:underline">Delete</button>
          </div>
        )}
      </div>
    </div>
  );
}