// app/news/loading.jsx
export default function NewsHomeLoading() {
  return (
    <div className="container mx-auto px-4 py-8 bg-white dark:bg-slate-950 min-h-screen">
      {/* Title skeleton */}
      <div className="h-8 w-64 bg-slate-200 dark:bg-slate-700 rounded mb-6" />

      {/* Tabs skeleton */}
      <div className="flex gap-6 mb-8 border-b border-slate-200 dark:border-slate-700 pb-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-6 w-20 bg-slate-100 dark:bg-slate-800 rounded"
          />
        ))}
      </div>

      {/* Sections skeleton */}
      <div className="space-y-12">
        {Array.from({ length: 3 }).map((_, sectionIndex) => (
          <section key={sectionIndex}>
            {/* Section header */}
            <div className="flex justify-between items-center mb-6">
              <div className="h-6 w-48 bg-slate-200 dark:bg-slate-700 rounded" />
              <div className="h-4 w-24 bg-slate-100 dark:bg-slate-800 rounded" />
            </div>

            {/* Cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, cardIndex) => (
                <div
                  key={cardIndex}
                  className="border border-slate-200 dark:border-slate-800 rounded-lg p-4 bg-white dark:bg-slate-900 shadow-sm"
                >
                  <div className="h-40 w-full bg-slate-100 dark:bg-slate-800 rounded mb-4" />
                  <div className="h-5 w-40 bg-slate-200 dark:bg-slate-700 rounded mb-2" />
                  <div className="h-4 w-32 bg-slate-100 dark:bg-slate-800 rounded mb-3" />
                  <div className="h-3 w-24 bg-slate-100 dark:bg-slate-800 rounded" />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}