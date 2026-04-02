import { useEffect, useState } from "react";

const announcements = [
  "Free Shipping for Orders Over $49 *Applies to retail order only.",
  "New Collection Available - Shop Now!",
  "Limited Time Offer - 20% Off Your First Order",
];

export default function Topbar() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="w-full bg-[#78070e] py-2 overflow-hidden"
      style={{ backgroundColor: "#78070e" }}
    >
      <div className="relative md:min-h-9 h-5">
        {announcements.map((announcement, index) => {
          let translateClass = "";

          if (index === currentIndex) {
            translateClass = "translate-x-0 opacity-100";
          } else if (index === (currentIndex - 1 + announcements.length) % announcements.length) {
            translateClass = "-translate-x-full opacity-0";
          } else {
            translateClass = "translate-x-full opacity-0";
          }

          return (
            <div
              key={index}
              className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ease-in-out ${translateClass}`}
            >
              <p className="text-white md:text-sm text-[8px] font-medium text-center px-4">
                {announcement}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
