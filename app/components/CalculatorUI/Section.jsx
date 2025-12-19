export function Section({ title, children }) {
  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border">
      <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">{title}</h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}