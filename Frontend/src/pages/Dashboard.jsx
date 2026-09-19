import { useTransactions } from '../Context/Transactioncontext';
import TransactionCard from '../components/TransactionCard';
import SummaryCard from '../components/SummaryCard';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell
} from 'recharts';

export default function Dashboard({ username }) {
  const { transactions, getSummary } = useTransactions();
  const { totalIncome, totalExpense, balance } = getSummary();

  const recent = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  // Month on Month data बनाओ
  const monthlyData = () => {
    const map = {};
    transactions.forEach(t => {
      const date = new Date(t.date);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const label = date.toLocaleString('en-IN', { month: 'short', year: '2-digit' });
      if (!map[key]) map[key] = { month: label, Income: 0, Expense: 0 };
      if (t.type === 'income') map[key].Income += Number(t.amount);
      if (t.type === 'expense') map[key].Expense += Number(t.amount);
    });
    return Object.values(map).sort((a, b) => a.month.localeCompare(b.month));
  };

  const chartData = monthlyData();

  const categoryData = (() => {
    const map = {};
    transactions.forEach(t => {
      if (t.type === 'expense') {
        map[t.category] = (map[t.category] || 0) + Number(t.amount);
      }
    });
    return Object.entries(map)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  })();

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#eab308', '#64748b'];

  return (
    <div className="space-y-6">
      <div className="animate-elegant-enter mt-2 mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500 tracking-tight drop-shadow-sm pb-1">
          Welcome, {username}!
        </h1>
        <p className="text-gray-400 dark:text-gray-400 mt-2 font-medium">Here's a quick overview of your finances.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <SummaryCard label="Total Income" amount={totalIncome} color="green" />
        <SummaryCard label="Total Expenses" amount={totalExpense} color="red" />
        <SummaryCard label="Balance" amount={balance} color="blue" />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Month on Month Graph */}
        {chartData.length > 0 && (
          <div className="bg-white/5 border border-white/10 dark:bg-slate-800/50 backdrop-blur rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-emerald-500/30 transition-all duration-300">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">📊 Month on Month</h2>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#94a3b830" />
                <XAxis dataKey="month" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                  cursor={{fill: 'rgba(255,255,255,0.05)'}}
                />
                <Legend wrapperStyle={{ paddingTop: '10px' }} />
                <Bar dataKey="Income" fill="#10b981" radius={[6, 6, 0, 0]} />
                <Bar dataKey="Expense" fill="#f43f5e" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Category Donut Chart */}
        {categoryData.length > 0 && (
          <div className="bg-white/5 border border-white/10 dark:bg-slate-800/50 backdrop-blur rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-teal-500/30 transition-all duration-300">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">🍩 Expenses by Category</h2>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={75}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  isAnimationActive={true}
                  animationBegin={200}
                  animationDuration={1200}
                  animationEasing="ease-out"
                >
                  {categoryData.map((entry, index) => (
                    <Cell 
                       key={`cell-${index}`} 
                       fill={COLORS[index % COLORS.length]} 
                       className="hover:opacity-80 transition-opacity duration-300 outline-none" 
                       stroke="rgba(255,255,255,0.1)"
                       strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                  itemStyle={{ color: '#fff', fontWeight: 500 }}
                  formatter={(value) => [`₹${value.toLocaleString()}`, 'Spent']}
                />
                <Legend layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{ paddingTop: '20px' }}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Recent Transactions */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-3">Recent Transactions</h2>
        <div className="space-y-2">
          {recent.length === 0 && (
            <p className="text-gray-400 text-center py-6">No transactions yet.</p>
          )}
          {recent.map(t => <TransactionCard key={t._id} transaction={t} />)}
        </div>
      </div>
    </div>
  );
}