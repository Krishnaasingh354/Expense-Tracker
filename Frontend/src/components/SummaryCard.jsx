export default function SummaryCard({ label, amount, color }) {
  const colors = {
    green: 'bg-green-50 border-green-200 text-green-600 dark:bg-green-900/30 dark:border-green-700',
    red: 'bg-red-50 border-red-200 text-red-500 dark:bg-red-900/30 dark:border-red-700',
    blue: 'bg-blue-50 border-blue-200 text-blue-600 dark:bg-blue-900/30 dark:border-blue-700',
  };

  return (
    <div className={`border rounded-xl p-5 text-center ${colors[color]}`}>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{label}</p>
      <p className="text-2xl font-bold">₹{Number(amount).toLocaleString('en-IN')}</p>
    </div>
  );
}