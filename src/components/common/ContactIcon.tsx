import { Link } from "react-router-dom";
import { useSiteConfig } from "../../provider";
import getImageUrl from "../../utils/getImageUrl";

export default function ContactIcon() {
  const { siteConfig } = useSiteConfig();
  const contactIcon = siteConfig?.contact;

  return (
    <div className="flex items-center gap-2">
      {contactIcon &&
        contactIcon.length > 0 &&
        contactIcon.map((item, index) => (
          <Link
            key={index}
            to={item?.link || "#"}
            className="inline-block text-white rounded-lg font-semibold"
          >
            <img
              src={getImageUrl(item?.image?.url) || ""}
              alt={`Contact Icon ${index + 1}`}
              className="h-10 w-10 object-cover"
            />
          </Link>
        ))}
    </div>
  );
}
