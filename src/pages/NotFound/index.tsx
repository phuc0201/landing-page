import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-white">
      <div className="section-container mx-auto text-center py-20">
        <h1 className="text-6xl font-bold text-gray-900">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-gray-700">Trang không tồn tại</h2>
        <p className="mt-4 text-gray-500">
          Xin lỗi, trang bạn tìm không tồn tại hoặc đã bị di chuyển.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-[#78070e] text-white rounded-full font-semibold hover:bg-[#5a0509] transition-colors"
          >
            Quay về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}
