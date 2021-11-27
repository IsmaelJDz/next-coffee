import { useState } from "react";

const useTrackLocation = () => {
  const [locationErrorMgs, setLocationErrorMgs] = useState("");
  const [latLong, setLatLong] = useState("");

  const success = (position) => {
    const { latitude, longitude } = position.coords;

    setLatLong(`${latitude},${longitude}`);
    setLocationErrorMgs("");
  };

  const error = () => {
    setLocationErrorMgs("Unable to retrieve your location");
  };

  const handleTrackLocation = () => {
    if (!navigator.geolocation) {
      setLocationErrorMgs("Geolocation is not supported by your browser");
    } else {
      //status.textContent = "Locating…";
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  return {
    latLong,
    locationErrorMgs,
    handleTrackLocation,
  };
};

export default useTrackLocation;
