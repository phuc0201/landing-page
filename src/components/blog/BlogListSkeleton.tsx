export default function BlogListSkeleton() {
  return (
    <div className="section-container md:py-12 py-5 relative min-h-[70vh]">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm animate-pulse">
            <div className="w-full h-44 md:h-40 lg:h-44 bg-gray-200 rounded-md mb-4" />
            <div className="p-4">
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-3" />
              <div className="h-3 bg-gray-200 rounded w-full mb-2" />
              <div className="h-3 bg-gray-200 rounded w-5/6 mb-2" />
              <div className="h-3 bg-gray-200 rounded w-1/3 mt-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
