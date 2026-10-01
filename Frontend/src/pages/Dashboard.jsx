import { useTransactions } from '../Context/Transactioncontext';
import TransactionCard from '../components/TransactionCard';
import SummaryCard from '../components/SummaryCard';
import { Link } from 'react-router-dom';
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

  // Month on Month data
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

  // Distinct, High-Contrast Multi-Color Palette for Pie Chart to highlight categories clearly
  const HIGHLIGHT_COLORS = [
    '#3b82f6', // Vibrant Blue
    '#10b981', // Emerald Green
    '#f59e0b', // Amber / Gold
    '#8b5cf6', // Violet / Purple
    '#ec4899', // Pink / Rose
    '#06b6d4', // Cyan / Teal
    '#e06834', // Soft Terracotta Orange
    '#ef4444', // Coral Red
    '#a855f7', // Bright Purple
    '#14b8a6', // Turquoise
  ];

  return (
    <div className="space-y-7">
      
      {/* Header Banner */}
      <div className="animate-elegant-enter mt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d9703e]/15 border border-[#d9703e]/30 text-[#ea8758] text-xs font-mono font-medium mb-2">
            <span>●</span>
            <span>PORTFOLIO DASHBOARD</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#ea8758] via-[#e5956e] to-[#d67341] tracking-tight pb-1">
            Welcome back, {username}!
          </h1>
          <p className="text-zinc-300 mt-1 text-sm sm:text-base font-normal">
            Real-time financial telemetry & spending analytics overview.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/add"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#d9703e] to-[#b85426] hover:from-[#e27a48] hover:to-[#c86433] text-white text-sm font-semibold shadow-md shadow-[#d9703e]/15 transition-all"
          >
            <span>+</span>
            <span>New Entry</span>
          </Link>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <SummaryCard label="Total Income" amount={totalIncome} color="green" />
        <SummaryCard label="Total Expenses" amount={totalExpense} color="red" />
        <SummaryCard label="Net Balance" amount={balance} color="blue" />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Month on Month Graph */}
        <div className="bg-[#10121a]/95 border border-zinc-800 backdrop-blur-xl rounded-3xl p-6 shadow-xl shadow-black/40 relative overflow-hidden group hover:border-[#d9703e]/30 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span className="text-[#ea8758]">📊</span>
              <span>Month on Month Breakdown</span>
            </h2>
            <span className="text-[11px] font-mono text-zinc-300 bg-zinc-800/80 px-2 py-0.5 rounded-md">
              TRENDS
            </span>
          </div>

          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={290}>
              <BarChart data={chartData} margin={{ top: 10, right: 15, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#252837" />
                <XAxis dataKey="month" stroke="#a1a1aa" tick={{ fill: '#e4e4e7', fontSize: 12 }} />
                <YAxis stroke="#a1a1aa" tick={{ fill: '#e4e4e7', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ 
                    backgroundColor: '#11131c', 
                    border: '1px solid rgba(217, 112, 62, 0.3)', 
                    borderRadius: '16px', 
                    color: '#ffffff',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.6)'
                  }}
                  cursor={{ fill: 'rgba(217, 112, 62, 0.05)' }}
                />
                <Legend wrapperStyle={{ paddingTop: '12px', color: '#e4e4e7' }} />
                <Bar dataKey="Income" fill="#10b981" radius={[6, 6, 0, 0]} />
                <Bar dataKey="Expense" fill="#d9703e" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[260px] flex flex-col items-center justify-center text-center p-6">
              <div className="w-12 h-12 rounded-2xl bg-zinc-800/60 border border-zinc-700/60 flex items-center justify-center text-2xl mb-3 text-zinc-400">
                📈
              </div>
              <p className="text-sm text-zinc-300 font-medium">No monthly data available yet</p>
              <p className="text-xs text-zinc-400 mt-1">Add your first transaction to unlock trends</p>
            </div>
          )}
        </div>

        {/* Category Donut Chart - Multi-Color High-Contrast */}
        <div className="bg-[#10121a]/95 border border-zinc-800 backdrop-blur-xl rounded-3xl p-6 shadow-xl shadow-black/40 relative overflow-hidden group hover:border-[#d9703e]/30 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span className="text-[#ea8758]">🍩</span>
              <span>Expenses by Category</span>
            </h2>
            <span className="text-[11px] font-mono text-zinc-300 bg-zinc-800/80 px-2 py-0.5 rounded-md">
              DISTRIBUTION
            </span>
          </div>

          {categoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height={290}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={75}
                  outerRadius={105}
                  paddingAngle={5}
                  dataKey="value"
                  isAnimationActive={true}
                  animationBegin={200}
                  animationDuration={1000}
                  animationEasing="ease-out"
                >
                  {categoryData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={HIGHLIGHT_COLORS[index % HIGHLIGHT_COLORS.length]} 
                      className="hover:opacity-90 transition-opacity duration-200 outline-none" 
                      stroke="#0d0e14"
                      strokeWidth={3}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ 
                    backgroundColor: '#11131c', 
                    border: '1px solid rgba(255, 255, 255, 0.2)', 
                    borderRadius: '16px', 
                    color: '#ffffff',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.6)'
                  }}
                  itemStyle={{ color: '#ffffff', fontWeight: 600 }}
                  formatter={(value) => [`₹${Number(value).toLocaleString('en-IN')}`, 'Spent']}
                />
                <Legend 
                  layout="horizontal" 
                  verticalAlign="bottom" 
                  align="center" 
                  wrapperStyle={{ paddingTop: '15px' }}
                  formatter={(value) => <span className="text-zinc-200 font-medium text-xs mr-2">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[260px] flex flex-col items-center justify-center text-center p-6">
              <div className="w-12 h-12 rounded-2xl bg-zinc-800/60 border border-zinc-700/60 flex items-center justify-center text-2xl mb-3 text-zinc-400">
                🥧
              </div>
              <p className="text-sm text-zinc-300 font-medium">No expenses logged yet</p>
              <p className="text-xs text-zinc-400 mt-1">Expenses will be automatically grouped by category</p>
            </div>
          )}
        </div>
      </div>

      {/* Recent Transactions Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span>Recent Transactions</span>
            <span className="text-xs font-mono font-medium text-zinc-300 bg-zinc-800 px-2 py-0.5 rounded-md">
              {recent.length}
            </span>
          </h2>
          <Link to="/transactions" className="text-xs text-[#ea8758] hover:text-[#d9703e] font-semibold transition-colors">
            View All →
          </Link>
        </div>

        <div className="space-y-2.5">
          {recent.length === 0 ? (
            <div className="bg-[#10121a]/60 border border-dashed border-zinc-800 rounded-2xl py-12 px-4 text-center">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-[#d9703e]/10 border border-[#d9703e]/20 flex items-center justify-center text-xl text-[#ea8758] mb-3">
                💳
              </div>
              <p className="text-sm text-zinc-300 font-medium">No transactions recorded yet.</p>
              <p className="text-xs text-zinc-400 mt-1">Start tracking your income and expenses today.</p>
              <Link
                to="/add"
                className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#d9703e]/15 hover:bg-[#d9703e]/25 text-[#ea8758] border border-[#d9703e]/25 text-xs font-semibold transition-all"
              >
                + Add Transaction
              </Link>
            </div>
          ) : (
            recent.map(t => <TransactionCard key={t._id} transaction={t} />)
          )}
        </div>
      </div>

    </div>
  );
}