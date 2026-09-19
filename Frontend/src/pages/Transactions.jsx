import { useTransactions } from '../Context/Transactioncontext';
import TransactionCard from '../components/TransactionCard';

export default function Transactions() {
  const { transactions } = useTransactions();
  const sorted = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">All Transactions</h1>
      {sorted.length === 0 && (
        <p className="text-gray-400 text-center py-10">No transactions yet.</p>
      )}
      <div className="space-y-2">
        {sorted.map(t => <TransactionCard key={t._id} transaction={t} showActions />)}
      </div>
    </div>
  );
}