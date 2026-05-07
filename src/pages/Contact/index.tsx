import Map from "../../components/common/Map";
import ContactForm from "../../components/contact/ContactForm";
import { useSiteConfig } from "../../provider";

export default function Contact() {
  const { siteConfig } = useSiteConfig();
  const contactInfor = siteConfig?.contactInfor;

  return (
    <div className="">
      <section className="section-container mx-auto px-4 md:py-12 py-5 space-y-6">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-(--primary-color)">
            Liên hệ
          </p>
          <h1 className="mt-3 text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
            Kết nối với MEDI Biotech Việt Nam
          </h1>
          <p className="mt-4 text-base md:text-lg text-gray-600 max-w-3xl">
            Gửi thông tin của bạn qua form bên dưới hoặc liên hệ trực tiếp theo thông tin công ty.
            Chúng tôi sẽ phản hồi sớm nhất có thể.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 items-start">
          <div className="ld:rounded-4xl rounded-2xl border border-[#ecd9d3] bg-white p-6 md:p-8 space-y-6 h-full">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-(--primary-color)">
                Thông tin công ty
              </p>
              <h2 className="mt-3 text-2xl font-bold text-gray-900 leading-tight">
                {contactInfor?.name || "Công Ty TNHH Nấm Dược Liệu MEDI Biotech Việt Nam"}
              </h2>
            </div>

            <div className="space-y-4 text-sm text-gray-700">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--primary-color)">
                  Địa chỉ
                </p>
                <p className="mt-2 text-base leading-relaxed">
                  {contactInfor?.address ||
                    "Số 246 ấp Lăng, xã Tân Chánh, Huyện Cần Đước, Can Duoc, Vietnam"}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--primary-color)">
                  Mã số thuế
                </p>
                <p className="mt-2 text-base font-semibold text-gray-900">
                  {contactInfor?.taxCode || "1102042674"}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--primary-color)">
                  Số điện thoại
                </p>
                <a
                  href={`tel:${contactInfor?.phoneNumber || "039 865 3281"}`}
                  className="mt-2 block text-base font-semibold text-gray-900 hover:text-(--primary-color) transition-colors"
                >
                  {contactInfor?.phoneNumber || "039 865 3281"}
                </a>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--primary-color)">
                  Email
                </p>
                <a
                  href={`mailto:${contactInfor?.email || "namduoclieumedibiotech281@gmail.com"}`}
                  className="mt-2 block text-base font-semibold text-gray-900 break-all hover:text-(--primary-color) transition-colors"
                >
                  {contactInfor?.email || "namduoclieumedibiotech281@gmail.com"}
                </a>
              </div>
            </div>
          </div>

          <div className="lg:rounded-4xl rounded-2xl border border-[#ecd9d3] bg-white overflow-hidden shadow-[0_24px_80px_rgba(120,7,14,0.08)]">
            <ContactForm />
          </div>
        </div>

        <div className="bg-white overflow-hidden h-125">
          <Map
            latitude={contactInfor?.lat ?? 10.4505234089688}
            longitude={contactInfor?.lng ?? 106.612401008606}
            title={contactInfor?.name ?? "Vị trí công ty"}
            address={contactInfor?.address ?? undefined}
          />
        </div>
      </section>
    </div>
  );
}
