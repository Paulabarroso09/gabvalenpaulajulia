import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Mapa = () => {
  const AddMarkerOnClick = () => {
    useMapEvents({
      click(e) {
        console.log("Lat:", e.latlng.lat, "Lng:", e.latlng.lng);
      },
    });
    return null;
  };

  return (
    <div className="container mt-4">
      <h2>Mapa de Focos da Dengue</h2>
      <MapContainer center={[-22.1256, -51.3925]} zoom={13} style={{ height: "400px", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <AddMarkerOnClick />
      </MapContainer>
    </div>
  );
};

export default Mapa;
