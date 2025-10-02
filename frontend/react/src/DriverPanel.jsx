import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [locationPermission, setLocationPermission] = useState(null);
  const [tripActive, setTripActive] = useState(false);
  const [coords, setCoords] = useState(null);

  // Ask for location when component loads
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocationPermission(true);
          setCoords({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        (err) => {
          setLocationPermission(false);
          console.log("Location denied:", err.message);
        }
      );
    } else {
      alert("Your browser doesn’t support location.");
    }
  }, []);

  const handleStartTrip = () => {
    if (!locationPermission) {
      alert("Please allow location access to start the trip.");
      return;
    }
    setTripActive(true);
    alert("Trip started! Tracking location...");
    // Send location to backend here (optional)
  };

  const handleEndTrip = () => {
    setTripActive(false);
    alert("Trip ended!");
    // Send "end trip" to backend here (optional)
  };

  return (
    <div className="app-container">
      <h1>Driver Panel</h1>
      <p>Bus Tracking System</p>

      {coords && (
        <p>
          Current Location: {coords.lat.toFixed(4)}, {coords.lng.toFixed(4)}
        </p>
      )}

      <div className="button-group">
        <button onClick={handleStartTrip} disabled={tripActive}>
          Start Trip
        </button>
        <button onClick={handleEndTrip} disabled={!tripActive}>
          End Trip
        </button>
      </div>

      {!locationPermission && (
        <p style={{ color: "red" }}>⚠ Please allow location access</p>
      )}
    </div>
  );
}

export default App;
