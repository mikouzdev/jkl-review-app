import { Box } from "@mui/material";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { useEffect } from "react";
import { useSelectedDistrict } from "../context/SelectedDistrictContext";

const MAX_ZOOM: number = 15;

function FlyToSelected() {
  const { selectedDistrict } = useSelectedDistrict();
  const map = useMap();

  useEffect(() => {
    if (!selectedDistrict) return;
    if (!selectedDistrict.longitude || !selectedDistrict.latitude) return;

    map.flyTo([selectedDistrict.longitude, selectedDistrict.latitude], MAX_ZOOM, {
      animate: true,
      duration: 2,
    });
  }, [selectedDistrict]);

  return null;
}

const bounds: L.LatLngBoundsExpression = [
  [61.83921, 25.26079],
  [62.42875, 26.05135],
];

function DistrictMap() {
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <MapContainer
        center={[62.2423, 25.749]}
        zoom={14}
        scrollWheelZoom={false}
        style={{ width: "100%", height: "100%" }}
        maxBounds={bounds}
        doubleClickZoom={false}
        maxZoom={MAX_ZOOM}
      >
        <TileLayer
          attribution='&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
          url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
        />

        <FlyToSelected />
      </MapContainer>
    </Box>
  );
}

export default DistrictMap;
