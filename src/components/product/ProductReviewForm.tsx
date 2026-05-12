import { Alert, Button, Input, Rate } from "antd";
import { useState } from "react";
import { useSendContactMutation } from "../../services/notificationService";

type ProductReviewFormProps = {
  productName: string;
};

export default function ProductReviewForm({ productName }: ProductReviewFormProps) {
  const [rating, setRating] = useState(5);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [sendContact, { isLoading }] = useSendContactMutation();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError(null);

    const reviewPrefix = `Khách hàng đánh giá sản phẩm ${productName} ${rating} sao`;
    const emailContent = `${reviewPrefix}\n${formData.message}`;

    try {
      await sendContact({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        message: emailContent,
      }).unwrap();

      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
      setRating(5);

      window.setTimeout(() => setSubmitted(false), 3000);
    } catch (err: any) {
      console.error("Failed to send product review:", err);
      setError("Có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  return (
    <div className="rounded-xl border border-(--primary-color) bg-linear-to-br bg-(--primary-color)/1 p-5 shadow-sm md:p-8">
      <div className="mb-6">
        <p className="text-sm font-semibold tracking-[0.2em] text-(--primary-color) uppercase">
          Đánh giá sản phẩm
        </p>
        <h3 className="mt-2 text-2xl font-bold text-gray-900 md:text-3xl">Đánh giá của bạn</h3>
        <p className="mt-2 text-sm text-gray-600 md:text-base">
          Đây là form đánh giá riêng cho sản phẩm này. Nội dung đánh giá sẽ được gửi cùng số sao bạn
          chọn.
        </p>
      </div>

      <div className="mb-5 rounded-xl border border-(--primary-color)/50 p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium text-(--primary-color)">Sản phẩm bạn đang đánh giá</p>
            <p className="text-lg font-semibold text-gray-900">{productName}</p>
          </div>
          <div className="flex flex-col gap-2 md:items-end">
            <span className="text-sm font-medium text-gray-700">Điểm đánh giá</span>
            <Rate value={rating} onChange={setRating} />
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block font-semibold text-gray-800">Tên</label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            placeholder="Nguyễn Văn A"
            size="large"
          />
        </div>

        <div>
          <label className="mb-2 block font-semibold text-gray-800">Email</label>
          <Input
            value={formData.email}
            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
            placeholder="example@email.com"
            size="large"
            type={"email"}
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="mb-2 block font-semibold text-gray-800">Điện thoại</label>
        <Input
          value={formData.phone}
          onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
          placeholder="0912 345 678"
          size="large"
          type={"tel"}
        />
      </div>

      <div className="mt-4">
        <label className="mb-2 block font-semibold text-gray-800">Nội dung đánh giá</label>
        <Input.TextArea
          value={formData.message}
          onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
          placeholder="Hãy chia sẻ trải nghiệm của bạn về sản phẩm này..."
          rows={6}
          size="large"
        />
      </div>

      <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <Button
          type="primary"
          size="large"
          loading={isLoading}
          onClick={handleSubmit}
          style={{ backgroundColor: "var(--primary-color)", borderColor: "var(--primary-color)" }}
          className="mb-4"
        >
          {isLoading ? "Đang gửi..." : submitted ? "Đã gửi đánh giá" : "Gửi đánh giá"}
        </Button>
      </div>

      {error && <Alert className="mt-5" type="error" showIcon title="Không thể gửi đánh giá" />}

      {submitted && (
        <Alert
          className="mt-5"
          type="success"
          showIcon
          title="Đánh giá đã được gửi"
          description="Cảm ơn bạn đã gửi phản hồi về sản phẩm."
        />
      )}
    </div>
  );
}
