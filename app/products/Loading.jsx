export default function ProductsLoading() {
  return (
    <section className="px-4 py-8 bg-white dark:bg-slate-950">
      <header className="max-w-6xl mx-auto mb-6">
        {/* Breadcrumb skeleton */}
        <div className="h-4 w-40 bg-slate-200 dark:bg-slate-700 rounded mb-4" />

        {/* Title skeleton */}
        <div className="h-8 w-64 bg-slate-200 dark:bg-slate-700 rounded mb-4" />

        {/* Categories skeleton */}
        <div className="mt-4 flex gap-2 items-center flex-wrap">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-8 w-20 bg-slate-100 dark:bg-slate-800 rounded-2xl"
            />
          ))}
        </div>
      </header>

      <main className="max-w-6xl mx-auto">
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-3 shadow-sm"
            >
              {/* Image skeleton */}
              <div className="w-full aspect-video rounded-lg bg-slate-200 dark:bg-slate-800 mb-3" />
              {/* Title */}
              <div className="h-4 w-32 bg-slate-200 dark:bg-slate-700 rounded mb-2" />
              {/* Subtitle */}
              <div className="h-3 w-24 bg-slate-100 dark:bg-slate-800 rounded mb-3" />
              {/* Tags / CTA */}
              <div className="h-3 w-20 bg-slate-100 dark:bg-slate-800 rounded" />
            </div>
          ))}
        </div>
      </main>
    </section>
  );
}