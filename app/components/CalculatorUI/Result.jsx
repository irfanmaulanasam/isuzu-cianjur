export function Result({ label, value, highlight, info, className = "" }) {
  return (
    <div className={`bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}>
    <div
      className={`flex justify-between items-center text-sm py-1 ${
        highlight ? "font-semibold text-blue-700 dark:text-blue-400" : "text-gray-700 dark:text-gray-300"
      }`}
    >
      <span>{label}</span>
      <span>{value || 'N/A'}</span>
    </div>
      <span className="text-xs  text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800/50">{info } </span>
    </div>
  );
}