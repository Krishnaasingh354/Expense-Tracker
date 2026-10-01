export default function SummaryCard({ label, amount, color }) {
  const cardConfig = {
    green: {
      border: 'border-emerald-500/30 hover:border-emerald-500/50',
      badgeBg: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30',
      textColor: 'text-emerald-400',
      icon: '↗',
      tag: 'INFLOW',
    },
    red: {
      border: 'border-rose-500/30 hover:border-rose-500/50',
      badgeBg: 'bg-rose-500/15 text-rose-300 border border-rose-500/30',
      textColor: 'text-rose-400',
      icon: '↘',
      tag: 'OUTFLOW',
    },
    blue: {
      border: 'border-[#d9703e]/30 hover:border-[#d9703e]/50 shadow-sm',
      badgeBg: 'bg-[#d9703e]/15 text-[#f5a278] border border-[#d9703e]/30',
      textColor: 'text-transparent bg-clip-text bg-gradient-to-r from-[#f5a278] via-[#e5956e] to-[#d67341]',
      icon: '◈',
      tag: 'NET BALANCE',
    },
  };

  const current = cardConfig[color] || cardConfig.blue;

  return (
    <div className={`relative bg-[#10121a]/95 backdrop-blur-xl border ${current.border} rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-0.5 group shadow-lg`}>
      {/* Top Tag & Icon */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
          {label}
        </span>
        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-lg ${current.badgeBg} flex items-center gap-1`}>
          <span>{current.icon}</span>
          <span>{current.tag}</span>
        </span>
      </div>

      {/* Main Amount */}
      <div className="flex items-baseline gap-1">
        <p className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${current.textColor}`}>
          ₹{Number(amount).toLocaleString('en-IN')}
        </p>
      </div>

      {/* Bottom Subtext */}
      <div className="mt-2 flex items-center gap-1 text-[11px] text-zinc-400 font-mono font-medium">
        <span>Verified ledger balance</span>
      </div>
    </div>
  );
}