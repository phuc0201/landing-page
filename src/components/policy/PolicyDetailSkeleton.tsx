export default function PolicyDetailSkeleton() {
  return (
    <div className="section-container py-10">
      <div className="max-w-3xl mx-auto">
        <div className="h-10 bg-gray-200 rounded w-3/4 mb-6 animate-pulse" />

        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse" />
        </div>

        <div className="mt-8 space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-4 bg-gray-200 rounded w-full animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}
