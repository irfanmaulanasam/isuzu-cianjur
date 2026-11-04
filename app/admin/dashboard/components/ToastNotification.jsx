export default function ToastNotification({ toast }) {
  if (!toast.show) return null;

  return (
    <div className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-xl shadow-lg border text-sm font-medium transition-all duration-300 flex items-center gap-3 ${
      toast.type === "success" 
        ? "bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950 dark:border-emerald-800 dark:text-emerald-200" 
        : "bg-red-50 border-red-200 text-red-800 dark:bg-red-950 dark:border-red-800 dark:text-red-200"
    }`}>
      <span className="text-lg">{toast.type === "success" ? "✅" : "⚠️"}</span>
      <div>
        <p className="font-semibold">{toast.message}</p>
        <p className="text-xs opacity-75">Respon server diterima pukul {toast.time}</p>
      </div>
    </div>
  );
}