import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom";
import { useEffect } from "react";

export default function ErrorBoundary() {
  const error = useRouteError();

  useEffect(() => {
    console.error("Route error boundary caught:", error);
  }, [error]);

  const message = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : error instanceof Error
      ? error.message
      : "Đã có lỗi không xác định xảy ra.";

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-white">
      <div className="section-container mx-auto text-center py-20">
        <h1 className="text-5xl font-bold text-gray-900">Rất tiếc!</h1>
        <h2 className="mt-4 text-2xl font-semibold text-gray-700">
          Trang gặp sự cố khi tải
        </h2>
        <p className="mt-4 text-gray-500 max-w-md mx-auto wrap-break-word">
          {message}
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-(--primary-color) text-white rounded-full font-semibold transition-colors"
          >
            Quay về trang chủ
          </Link>
          <button
            onClick={() => window.location.reload()}
            className="inline-block px-6 py-3 border border-gray-300 text-gray-700 rounded-full font-semibold hover:bg-gray-50 transition-colors"
          >
            Tải lại trang
          </button>
        </div>
      </div>
    </div>
  );
}
