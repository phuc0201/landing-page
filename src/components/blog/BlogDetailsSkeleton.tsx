export default function BlogDetailsSkeleton() {
  return (
    <div className="section-container py-5 min-h-150 mx-auto">
      <div className="h-8 bg-gray-200 rounded w-3/4 mb-4 animate-pulse" />
      <div className="h-4 bg-gray-200 rounded w-1/4 mb-8 animate-pulse" />

      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
      </div>
    </div>
  );
}
