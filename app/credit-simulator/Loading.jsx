// app/credit-simulator/loading.jsx
export default function Loading() {
  return (
    <div className="flex justify-center p-8 bg-gray-50 dark:bg-gray-800 min-h-screen">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row shadow-lg rounded-lg overflow-hidden bg-white dark:bg-gray-900">
        {/* Skeleton Loading */}
        <div className="w-full lg:w-1/2 p-6 space-y-4">
          <div className="h-8 bg-gray-300 rounded w-3/4 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
          <div className="h-12 bg-gray-300 rounded animate-pulse"></div>
          <div className="h-20 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="w-full lg:w-1/2 p-6 space-y-4">
          <div className="h-8 bg-gray-300 rounded w-1/2 animate-pulse"></div>
          <div className="h-20 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-20 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}