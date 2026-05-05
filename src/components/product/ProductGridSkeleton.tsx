export default function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-xl bg-white shadow-sm animate-pulse">
          <div className="relative aspect-4/3 overflow-hidden bg-gray-200">
            <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/40 to-transparent animate-[shimmer_1.5s_infinite]" />
          </div>

          <div className="space-y-3 p-4">
            <div className="h-5 w-4/5 rounded bg-gray-200" />
            <div className="h-3 w-full rounded bg-gray-200" />
            <div className="h-3 w-5/6 rounded bg-gray-200" />
            <div className="flex items-center gap-2 pt-1">
              <div className="h-4 w-24 rounded bg-gray-200" />
              <div className="h-4 w-16 rounded bg-gray-100" />
            </div>
          </div>
        </div>
      ))}

      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
