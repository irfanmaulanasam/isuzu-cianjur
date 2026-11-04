import Link from "next/link";

export default function DataTable({ 
  loading, 
  columns, 
  data, 
  sortConfig, 
  handleSort, 
  getSortIcon, 
  onDeleteClick,
  editUrlPrefix 
}) {
  if (loading) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-8 text-center text-slate-500">
        Memuat data...
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 text-sm">
            {columns.map((col) => (
              <th
                key={col.key}
                onClick={() => col.sortable && handleSort(col.key)}
                className={`p-4 font-semibold text-slate-600 dark:text-slate-300 ${
                  col.sortable ? "cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition" : ""
                } ${col.width || ""}`}
              >
                {col.label} {col.sortable && getSortIcon(col.key)}
              </th>
            ))}
            <th className="p-4 font-semibold text-slate-600 dark:text-slate-300 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 2} className="p-8 text-center text-slate-500">
                Tidak ada data yang cocok.
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={item.id} className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50">
                <td className="p-4 text-slate-700 dark:text-slate-300">{item.id}</td>
                <td className="p-4 font-medium text-slate-900 dark:text-white max-w-xs truncate">
                  {item.title}
                </td>
                <td className="p-4 text-slate-700 dark:text-slate-300 uppercase text-xs font-bold tracking-wider">
                  {item.category}
                </td>
                <td className="p-4 text-sm text-slate-500 dark:text-slate-400">
                  {new Date(item.createdAt).toLocaleDateString("id-ID", {
                    day: "numeric", month: "short", year: "numeric",
                  })}
                </td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${item.published ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                    {item.published ? "Publik" : "Draf"}
                  </span>
                </td>
                <td className="p-4 text-right space-x-3">
                  <Link
                    href={`${editUrlPrefix}/${item.id}`}
                    className="text-blue-600 hover:text-blue-800 font-semibold text-sm"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => onDeleteClick(item)}
                    className="text-red-600 hover:text-red-800 font-semibold text-sm"
                  >
                    Arsip / Hapus
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}