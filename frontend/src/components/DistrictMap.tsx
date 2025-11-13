import { Box } from "@mui/material";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { useEffect } from "react";
import { useSelectedDistrict } from "../context/SelectedDistrictContext";

function FlyToSelected() {
  const { selectedDistrict } = useSelectedDistrict();
  const map = useMap();

  useEffect(() => {
    if (!selectedDistrict) return;
    if (!selectedDistrict.longitude || !selectedDistrict.latitude) return;

    map.flyTo([selectedDistrict.longitude, selectedDistrict.latitude], 15, {
      animate: true,
      duration: 2,
    });
  }, [selectedDistrict]);

  return null;
}

function DistrictMap() {
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <MapContainer
        center={[62.2423, 25.749]}
        zoom={14}
        scrollWheelZoom={false}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FlyToSelected />
      </MapContainer>
    </Box>
  );
}

export default DistrictMap;
