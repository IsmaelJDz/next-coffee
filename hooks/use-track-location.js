import { useState } from "react";

const useTrackLocation = () => {
  const [locationErrorMgs, setLocationErrorMgs] = useState("");
  const [isFindingLocation, setIsFindingLocation] = useState(false);
  const [latLong, setLatLong] = useState("");

  const success = (position) => {
    const { latitude, longitude } = position.coords;

    setLatLong(`${latitude},${longitude}`);
    setLocationErrorMgs("");
    setIsFindingLocation(false);
  };

  const error = () => {
    setIsFindingLocation(false);
    setLocationErrorMgs("Unable to retrieve your location");
  };

  const handleTrackLocation = () => {
    setIsFindingLocation(true);
    if (!navigator.geolocation) {
      setLocationErrorMgs("Geolocation is not supported by your browser");
      setIsFindingLocation(false);
    } else {
      //status.textContent = "Locating…";
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  return {
    latLong,
    locationErrorMgs,
    isFindingLocation,
    handleTrackLocation,
  };
};

export default useTrackLocation;
