export default function ProductDetailSkeleton() {
  return (
    <div className="w-full min-h-[70vh]">
      <div className="grid lg:grid-cols-5 gap-10">
        <div className="lg:col-span-2">
          <div className="w-full aspect-square rounded-xl bg-gray-200 animate-pulse relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/40 to-transparent animate-[shimmer_1.5s_infinite]" />
          </div>

          <div className="mt-3 flex gap-2 overflow-hidden pb-1">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-17 w-17 rounded-md bg-gray-200 animate-pulse shrink-0" />
            ))}
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="space-y-6">
            <div className="h-14 w-4/5 rounded bg-gray-200 animate-pulse" />

            <div className="flex items-center gap-4">
              <div className="h-9 w-40 rounded bg-gray-200 animate-pulse" />
              <div className="h-4 w-24 rounded bg-gray-100 animate-pulse" />
            </div>

            <div className="space-y-3">
              <div className="h-4 w-full rounded bg-gray-200 animate-pulse" />
              <div className="h-4 w-11/12 rounded bg-gray-200 animate-pulse" />
              <div className="h-4 w-5/6 rounded bg-gray-200 animate-pulse" />
            </div>

            <div className="pt-4">
              <div className="h-12 w-full rounded-lg bg-gray-200 animate-pulse" />
            </div>

            <div className="flex items-center gap-3 pt-1">
              <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse" />
              <div className="h-4 w-48 rounded bg-gray-200 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      <div className="ck-content mt-10">
        <div className="h-8 w-72 rounded bg-gray-200 animate-pulse mb-5" />
        <div className="space-y-3">
          <div className="h-4 w-full rounded bg-gray-200 animate-pulse" />
          <div className="h-4 w-full rounded bg-gray-200 animate-pulse" />
          <div className="h-4 w-5/6 rounded bg-gray-200 animate-pulse" />
          <div className="h-4 w-3/4 rounded bg-gray-200 animate-pulse" />
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
