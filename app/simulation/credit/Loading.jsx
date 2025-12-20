export default function CreditSimulationLoading() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-800 flex justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row shadow-xl rounded-2xl overflow-hidden bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
        {/* Skeleton breadcrumb */}
        <div className="absolute top-4 left-4 h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded" />

        {/* Left: form skeleton */}
        <div className="w-full lg:w-1/2 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-700">
          <div className="h-7 w-56 bg-gray-200 dark:bg-gray-700 rounded mb-6" />

          {/* Model field */}
          <div className="mb-6">
            <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
            <div className="h-11 w-full bg-gray-100 dark:bg-gray-800 rounded-lg" />
          </div>

          {/* Harga OTR */}
          <div className="bg-blue-50 dark:bg-gray-800 p-4 rounded-xl mb-6 border border-blue-100 dark:border-gray-700">
            <div className="h-3 w-40 bg-blue-100 dark:bg-gray-700 rounded mb-2" />
            <div className="h-7 w-48 bg-gray-200 dark:bg-gray-600 rounded" />
          </div>

          {/* DP + DP% */}
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 mb-6">
            <div className="w-full sm:w-1/2">
              <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
              <div className="h-10 bg-gray-100 dark:bg-gray-800 rounded-lg" />
            </div>
            <div className="w-full sm:w-1/2">
              <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
              <div className="h-10 bg-gray-100 dark:bg-gray-800 rounded-lg" />
            </div>
          </div>

          {/* Tenor + bunga */}
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 mb-6">
            <div className="w-full sm:w-1/2">
              <div className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
              <div className="h-10 bg-gray-100 dark:bg-gray-800 rounded-lg" />
            </div>
            <div className="w-full sm:w-1/2">
              <div className="h-4 w-44 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
              <div className="h-10 bg-gray-100 dark:bg-gray-800 rounded-lg" />
            </div>
          </div>

          <div className="h-12 w-full bg-gray-50 dark:bg-gray-800 rounded-lg border border-dashed border-gray-200 dark:border-gray-600" />
        </div>

        {/* Right: results skeleton */}
        <div className="w-full lg:w-1/2 p-6 sm:p-8">
          <div className="h-7 w-64 bg-gray-200 dark:bg-gray-700 rounded mb-6" />

          <div className="space-y-6">
            {/* Custom result card */}
            <div className="p-4 bg-green-50 dark:bg-green-900/40 rounded-xl border border-green-200 dark:border-green-700">
              <div className="h-6 w-52 bg-green-200 dark:bg-green-700 rounded mb-3" />
              <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-3" />
              <div className="flex justify-between items-center pt-2 border-t border-green-200 dark:border-green-700 mt-2">
                <div className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="h-7 w-40 bg-green-200 dark:bg-green-600 rounded" />
              </div>
            </div>

            {/* Title perbandingan */}
            <div className="h-5 w-60 bg-gray-200 dark:bg-gray-700 rounded mx-auto lg:mx-0" />

            {/* Leasing accordion skeleton */}
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="border-2 rounded-xl p-4 bg-white dark:bg-gray-800 border-blue-100 dark:border-blue-700"
                >
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <div className="h-5 w-40 bg-gray-200 dark:bg-gray-700 rounded mb-1" />
                      <div className="h-3 w-48 bg-gray-100 dark:bg-gray-700 rounded" />
                    </div>
                    <div className="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded-full" />
                  </div>
                  <div className="h-4 w-32 bg-gray-100 dark:bg-gray-700 rounded mt-3" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}