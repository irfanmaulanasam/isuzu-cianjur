export default function Loading() {
  return (
    <div className="container mx-auto p-4 animate-pulse">
      <h1 className="h-8 bg-gray-200 rounded w-3/4 mb-6"></h1>
      <div className="h-64 bg-gray-200 rounded mb-8"></div>
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-11/12"></div>
        <div className="h-4 bg-gray-200 rounded w-4/5"></div>
      </div>
      {/* Ini akan muncul selama data artikel (getArticleData) sedang diambil */}
      <p className="mt-8 text-center text-gray-500">Memuat konten...</p>
    </div>
  );
}