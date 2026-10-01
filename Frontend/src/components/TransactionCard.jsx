import { Link } from 'react-router-dom';
import { useTransactions } from '../Context/Transactioncontext.jsx';

const CATEGORY_ICONS = {
  Food: '🍔',
  Travel: '✈️',
  Bills: '💡',
  Salary: '💼',
  Shopping: '🛍️',
  Health: '💊',
  'Room Rent': '🏠',
  Other: '🏷️',
};

export default function TransactionCard({ transaction, showActions = false }) {
  const { deleteTransaction } = useTransactions();
  const { _id, title, amount, type, category, date, note } = transaction;

  const handleDelete = () => {
    if (window.confirm('Delete this transaction entry?')) {
      deleteTransaction(_id);
    }
  };

  const icon = CATEGORY_ICONS[category] || '💰';
  const isIncome = type === 'income';

  return (
    <div className="group relative flex items-center justify-between bg-[#11131c]/95 hover:bg-[#151824] border border-zinc-800 hover:border-[#d9703e]/40 rounded-2xl p-4 transition-all duration-200 shadow-md shadow-black/20">
      
      {/* Left Details */}
      <div className="flex items-center gap-3.5 min-w-0">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 ${
          isIncome 
            ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30' 
            : 'bg-[#d9703e]/15 text-[#f5a278] border border-[#d9703e]/30'
        }`}>
          {icon}
        </div>

        <div className="truncate">
          <p className="font-semibold text-white text-sm tracking-tight truncate group-hover:text-[#ea8758] transition-colors">
            {title}
          </p>
          <div className="flex items-center gap-2 text-[11px] text-zinc-300 mt-0.5 font-mono">
            <span className="text-zinc-200 font-semibold">{category}</span>
            <span className="text-zinc-500">•</span>
            <span>{date ? new Date(date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Recent'}</span>
            {note && (
              <>
                <span className="text-zinc-500">•</span>
                <span className="truncate max-w-[120px] text-zinc-400 italic">"{note}"</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Right Details: Amount & Actions */}
      <div className="flex items-center gap-3 shrink-0 ml-3">
        <div className="text-right">
          <span className={`font-mono font-bold text-base tracking-tight ${
            isIncome 
              ? 'text-emerald-400' 
              : 'text-[#ea8758]'
          }`}>
            {isIncome ? '+' : '-'}₹{Number(amount).toLocaleString('en-IN')}
          </span>
          <div className="text-[10px] uppercase font-mono text-zinc-400 font-semibold text-right">
            {isIncome ? 'Credit' : 'Debit'}
          </div>
        </div>

        {showActions && (
          <div className="flex items-center gap-1.5 ml-2 border-l border-zinc-800 pl-3">
            <Link 
              to={`/edit/${_id}`} 
              className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-[#d9703e]/20 text-zinc-200 hover:text-[#ea8758] text-xs font-semibold transition-colors border border-transparent hover:border-[#d9703e]/30"
            >
              Edit
            </Link>
            <button 
              onClick={handleDelete} 
              className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-red-500/20 text-zinc-300 hover:text-red-400 text-xs font-semibold transition-colors border border-transparent hover:border-red-500/30"
              title="Delete transaction"
            >
              ✕
            </button>
          </div>
        )}
      </div>

    </div>
  );
}