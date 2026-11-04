export default function CategoryFilter({ selectedCategory, setSelectedCategory, categories }) {
  return (
    <div className="flex gap-4 mb-6 bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 items-center">
      <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">Filter Kategori:</span>
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm bg-slate-50 dark:bg-slate-700 dark:text-white"
      >
        <option value="all">Semua Kategori</option>
        {categories.map((cat) => (
          <option key={cat.value} value={cat.value}>
            {cat.label}
          </option>
        ))}
      </select>
    </div>
  );
}