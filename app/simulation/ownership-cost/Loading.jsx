export default function TCOLoading() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-5xl mx-auto p-6">
        {/* Breadcrumb skeleton */}
        <div className="h-4 w-40 bg-slate-200 dark:bg-slate-700 rounded mb-4" />

        {/* Title skeleton */}
        <div className="mb-8">
          <div className="h-8 w-72 bg-slate-200 dark:bg-slate-700 rounded mb-3" />
          <div className="h-4 w-56 bg-slate-100 dark:bg-slate-800 rounded" />
        </div>

        {/* Top info card skeleton */}
        <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl p-6 mb-8 shadow-sm">
          <div className="h-5 w-52 bg-slate-200 dark:bg-slate-700 rounded mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="h-16 bg-slate-100 dark:bg-slate-800 rounded-lg" />
            <div className="h-16 bg-slate-100 dark:bg-slate-800 rounded-lg" />
            <div className="h-16 bg-slate-100 dark:bg-slate-800 rounded-lg" />
          </div>
        </div>

        {/* Main grid skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: inputs */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
              <div className="h-5 w-48 bg-slate-200 dark:bg-slate-700 rounded mb-4" />
              <div className="space-y-3">
                <div className="h-10 bg-slate-100 dark:bg-slate-800 rounded" />
                <div className="h-10 bg-slate-100 dark:bg-slate-800 rounded" />
                <div className="h-10 bg-slate-100 dark:bg-slate-800 rounded" />
                <div className="h-10 bg-slate-100 dark:bg-slate-800 rounded" />
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
              <div className="h-5 w-40 bg-slate-200 dark:bg-slate-700 rounded mb-4" />
              <div className="space-y-3">
                <div className="h-10 bg-slate-100 dark:bg-slate-800 rounded" />
                <div className="h-10 bg-slate-100 dark:bg-slate-800 rounded" />
                <div className="h-10 bg-slate-100 dark:bg-slate-800 rounded" />
              </div>
            </div>
          </div>

          {/* Right: results */}
          <div className="bg-white dark:bg-gradient-to-br dark:from-emerald-900/20 dark:to-blue-900/20 rounded-2xl border-2 border-emerald-200/50 dark:border-emerald-500/30 p-4 shadow-2xl">
            <div className="h-5 w-52 bg-slate-200 dark:bg-slate-700 rounded mb-4" />
            <div className="space-y-3">
              <div className="h-8 bg-slate-100 dark:bg-slate-800 rounded" />
              <div className="h-7 bg-slate-100 dark:bg-slate-800 rounded" />
              <div className="h-7 bg-slate-100 dark:bg-slate-800 rounded" />
              <hr className="my-3 border-slate-200 dark:border-slate-700" />
              <div className="h-6 bg-slate-100 dark:bg-slate-800 rounded" />
              <div className="h-6 bg-slate-100 dark:bg-slate-800 rounded" />
              <div className="h-6 bg-slate-100 dark:bg-slate-800 rounded" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}