import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import markerImg from "../../assets/images/location-pin.png";

const markerIcon = L.icon({
  iconUrl: markerImg,
  iconRetinaUrl: markerImg,
  iconSize: [44, 44],
  iconAnchor: [22, 44],
  popupAnchor: [0, -40],
});

function CtrlWheelZoom() {
  const map = useMap();

  useEffect(() => {
    const container = map.getContainer();

    const onWheel = (event: WheelEvent) => {
      if (!event.ctrlKey) {
        return;
      }

      event.preventDefault();
      const zoomDelta = event.deltaY < 0 ? 1 : -1;
      const nextZoom = map.getZoom() + zoomDelta;

      map.setZoom(nextZoom, { animate: false });
    };

    container.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", onWheel);
    };
  }, [map]);

  return null;
}

export default function Map() {
  const latitude = 10.850664000361634;
  const longitude = 106.77191309664425;
  const [isCtrlPressed, setIsCtrlPressed] = useState(false);
  const [hasFinePointer, setHasFinePointer] = useState(false);
  const [isOverlayHovered, setIsOverlayHovered] = useState(false);

  useEffect(() => {
    const pointerMedia = window.matchMedia("(pointer: fine)");
    const updatePointer = () => {
      setHasFinePointer(pointerMedia.matches);
    };

    updatePointer();
    pointerMedia.addEventListener("change", updatePointer);

    return () => {
      pointerMedia.removeEventListener("change", updatePointer);
    };
  }, []);

  useEffect(() => {
    if (!hasFinePointer) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Control") {
        setIsCtrlPressed(true);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === "Control") {
        setIsCtrlPressed(false);
      }
    };

    const handleWindowBlur = () => {
      setIsCtrlPressed(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("blur", handleWindowBlur);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", handleWindowBlur);
    };
  }, [hasFinePointer]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: "320px",
      }}
      className="h-full"
    >
      <MapContainer
        center={[latitude, longitude]}
        zoom={17}
        zoomControl={false}
        scrollWheelZoom={false}
        touchZoom={false}
        doubleClickZoom={false}
        boxZoom={false}
        keyboard={false}
        style={{ height: "100%", width: "100%" }}
      >
        <CtrlWheelZoom />

        <TileLayer
          url="https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
          subdomains={["mt0", "mt1", "mt2", "mt3"]}
          maxZoom={20}
          attribution="Google"
        />

        <Marker position={[latitude, longitude]} icon={markerIcon}>
          <Popup>
            Location: {latitude}, {longitude}
          </Popup>
        </Marker>
      </MapContainer>

      {(!isCtrlPressed || !hasFinePointer) && (
        <div
          onMouseEnter={() => setIsOverlayHovered(true)}
          onMouseLeave={() => setIsOverlayHovered(false)}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 500,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: isOverlayHovered ? "rgba(0, 0, 0, 0.35)" : "transparent",
            cursor: "default",
            transition: "background 0.2s ease",
          }}
        >
          <div
            style={{
              opacity: (!hasFinePointer ? 1 : isOverlayHovered) ? 1 : 0,
              transform: !hasFinePointer
                ? "translateY(0)"
                : isOverlayHovered
                  ? "translateY(0)"
                  : "translateY(6px)",
              transition: "opacity 0.2s ease, transform 0.2s ease",
              color: "#fff",
              fontWeight: 500,
              fontSize: "clamp(16px, 2vw, 20px)",
              textAlign: "center",
              textShadow: "0 2px 8px rgba(0, 0, 0, 0.45)",
              pointerEvents: "none",
              padding: "0 16px",
            }}
          >
            {hasFinePointer ? "Giữ Ctrl + cuộn để phóng to bản đồ" : ""}
          </div>
        </div>
      )}
    </div>
  );
}
