// app/outlet/loading.jsx
export default function Loading() {
  return (
    <section className="bg-gradient-to-b from-white to-slate-50 py-12 min-h-screen">
      <div className="container mx-auto max-w-5xl">
        Konten sedang dimuat
        <div className="text-center mb-8">
          <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4 animate-pulse"></div>
        </div>

        {/* Skeleton Tombol */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-10 bg-gray-300 rounded-full w-24 animate-pulse"
            />
          ))}
        </div>

        {/* Skeleton Konten */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
          {/* Skeleton Info */}
          <div className="flex-1 space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-gray-300 rounded animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-6 bg-gray-300 rounded w-3/4 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                <div className="h-10 bg-gray-300 rounded w-32 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Skeleton Map */}
          <div className="flex-1 w-full">
            <div className="h-[300px] bg-gray-300 rounded-xl animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}