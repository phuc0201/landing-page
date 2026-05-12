import { useState } from "react";
import BgBlack from "../../assets/images/bg-black.webp";
import { useSendContactMutation } from "../../services/notificationService";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [sendContact, { isLoading }] = useSendContactMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError(null);

    try {
      await sendContact({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        message: formData.message,
      }).unwrap();

      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err: any) {
      console.error("Failed to send contact:", err);
      setError(err?.data?.error?.message || "Có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${BgBlack})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="mx-auto w-full lg:p-14 p-5"
    >
      <div className="mb-12 grid justify-center ">
        <h2 className="text-3xl font-bold text-white mb-3 ">Liên hệ với chúng tôi</h2>
        <p className="text-white">Chúng tôi sẽ phản hồi trong vòng 24 giờ</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
          <div className="">
            <label htmlFor="name" className="block text-sm font-semibold text-white">
              Tên <span className="text-(--primary-color)">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Nguyễn Văn A"
              className="w-full px-4 py-3 text-sm  rounded outline-none transition-colors duration-200 focus:border-(--primary-color) bg-white placeholder-gray-400"
            />
          </div>

          <div className="">
            <label htmlFor="email" className="block text-sm font-semibold text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@email.com"
              className="w-full px-4 py-3 text-sm  rounded outline-none transition-colors duration-200 focus:border-(--primary-color) bg-white placeholder-gray-400"
            />
          </div>
        </div>

        <div className="">
          <label htmlFor="phone" className="block text-sm font-semibold text-white">
            Điện thoại <span className="text-(--primary-color)">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="0912 345 678"
            className="w-full px-4 py-3 text-sm rounded outline-none transition-colors duration-200 bg-white placeholder-gray-400"
          />
        </div>

        <div className="">
          <label htmlFor="message" className="block text-sm font-semibold text-white">
            Nội dung <span className="text-(--primary-color)">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            required
            placeholder="Nhập nội dung bạn muốn gửi..."
            className="w-full px-4 py-3 text-sm  rounded outline-none transition-colors duration-200 focus:border-(--primary-color) bg-white placeholder-gray-400 resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 text-sm font-semibold text-white bg-(--primary-color) rounded hover:bg-[#5f0509] active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Đang gửi..." : submitted ? "Đã gửi thành công!" : "Gửi"}
        </button>
      </form>

      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded">
          <p className="text-sm text-red-700 font-medium">{"Có lỗi xảy ra. Vui lòng thử lại."}</p>
        </div>
      )}

      {submitted && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded">
          <p className="text-sm text-green-700 font-medium">
            Cảm ơn bạn! Chúng tôi sẽ liên hệ với bạn sớm.
          </p>
        </div>
      )}
    </div>
  );
}
