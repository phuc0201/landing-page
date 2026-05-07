import { FloatButton } from "antd";
import { useEffect, useMemo, useState } from "react";
import { FaPhone } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { useSiteConfig } from "../../provider";

export default function FloatBtn() {
  const { siteConfig } = useSiteConfig();
  const [open, setOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const handler = (event: MediaQueryListEvent) => setIsDesktop(event.matches);

    setIsDesktop(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const baseSize = isDesktop ? 56 : 48;
  const childSize = isDesktop ? 52 : 48;
  const iconSize = isDesktop ? 28 : 24;
  const childIconSize = isDesktop ? 24 : 20;

  const groupStyle = {
    insetInlineEnd: isDesktop ? 32 : 24,
    insetBlockEnd: isDesktop ? 32 : 16,
    width: baseSize,
    height: baseSize,
  };

  const phoneNumber = siteConfig?.contactInfor?.phoneNumber || "0398653281";
  const contactIcon = siteConfig?.contact || [];

  const social = useMemo(() => {
    return contactIcon.map((item) => ({
      id: item.id,
      icon: (
        <img
          src={import.meta.env.VITE_BASE_URL + item.image?.url}
          style={{
            width: childIconSize,
            height: childIconSize,
            objectFit: "contain",
          }}
        />
      ),
      href: item.link,
      color: "#fff",
      label: item.title,
    }));
  }, [contactIcon, childIconSize]);

  const contactLinks = [
    {
      id: "phone",
      icon: <FaPhone style={{ fontSize: childIconSize }} />,
      href: `tel:${phoneNumber}`,
      color: "#fff",
      label: "Gọi ngay",
    },
    ...social,
  ];

  return (
    <FloatButton.Group
      open={open}
      onOpenChange={setOpen}
      trigger="click"
      type="primary"
      style={groupStyle}
      icon={
        <GoPlus
          style={{
            fontSize: iconSize,
            transform: open ? "rotate(360deg)" : "rotate(0deg)",
            transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        />
      }
      closeIcon={
        <GoPlus
          style={{
            fontSize: iconSize,
            transition: "transform 0.4s ease",
            transform: "rotate(45deg)",
          }}
        />
      }
    >
      {contactLinks.map((item) => (
        <FloatButton
          key={item.id}
          tooltip={item.label}
          icon={item.icon as any}
          style={{
            backgroundColor: item.color,
            width: childSize,
            height: childSize,
          }}
          onClick={() => {
            const href = item.href;
            if (!href) return;
            if (href.startsWith("tel:")) {
              window.location.href = href;
              return;
            }
            window.open(href, "_blank");
          }}
        />
      ))}
    </FloatButton.Group>
  );
}
