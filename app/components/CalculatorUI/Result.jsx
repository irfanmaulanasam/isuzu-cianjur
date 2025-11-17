export function Result({ label, value, highlight }) {
  return (
    <div
      className={`flex justify-between items-center text-sm py-1 ${
        highlight ? "font-semibold text-blue-700" : "text-gray-700"
      }`}
    >
      <span>{label}</span>
      <span>{value || 'N/A'}</span>
    </div>
  );
}