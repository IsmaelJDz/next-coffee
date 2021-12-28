import { useState, useContext } from "react";

import { ACTION_TYPES, StoreContext } from "../context/store-context";

const useTrackLocation = () => {
  const [locationErrorMgs, setLocationErrorMgs] = useState("");
  const [isFindingLocation, setIsFindingLocation] = useState(false);
  //const [latLong, setLatLong] = useState("");

  const { dispatch } = useContext(StoreContext);

  const success = (position) => {
    const { latitude, longitude } = position.coords;

    //setLatLong(`${latitude},${longitude}`);
    dispatch({
      type: ACTION_TYPES.SET_LAT_LONG,
      payload: { latLong: `${latitude},${longitude}` },
    });
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
    //atLong,
    locationErrorMgs,
    isFindingLocation,
    handleTrackLocation,
  };
};

export default useTrackLocation;
