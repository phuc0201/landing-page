export default function BannerSliderSkeleton({ itemsToShow = 1 }: { itemsToShow?: number }) {
  const isMultiple = itemsToShow > 1;

  return (
    <div className={`w-full overflow-hidden ${isMultiple ? "-mx-1" : ""}`}>
      <div className="flex">
        {isMultiple ? (
          Array.from({ length: Math.min(itemsToShow, 4) }).map((_, i) => (
            <div key={i} className="flex-1 px-1">
              <div className="h-40 sm:h-55 md:h-70 lg:h-90 rounded bg-gray-200 animate-pulse relative overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/40 to-transparent" />
              </div>
            </div>
          ))
        ) : (
          <div className="w-full max-h-[90vh] h-[50vw] min-h-40 bg-gray-200 animate-pulse relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/40 to-transparent" />
          </div>
        )}
      </div>

      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
