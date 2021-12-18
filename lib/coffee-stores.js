import { createApi } from "unsplash-js";

const unsplashApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_ACCESS_KEY,
});

const getUrlForCoffeeStores = (latLong, limit, query) => {
  return `https://api.foursquare.com/v2/venues/search?ll=${latLong}&query=${query}&limit=${limit}&client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&client_secret=${process.env.NEXT_PUBLIC_CLIENT_SECRET}&v=20210525`;
};

const getListOfCoffeeStoresPhotos = async () => {
  const photos = await unsplashApi.search.getPhotos({
    query: "coffee shop",
    page: 1,
    per_page: 10,
  });
  const unsplashResults = photos.response.results;

  const photosResponse = unsplashResults.map((result) => result.urls["small"]);

  return photosResponse;
};

export const fetchCoffeeStore = async (
  latLong = "19.296764,-98.8832785",
  limit = 6
) => {
  const photos = await getListOfCoffeeStoresPhotos();

  const response = await fetch(
    getUrlForCoffeeStores(latLong, limit, "coffee%20stores")
  );

  const data = await response.json();

  return data.response.venues.map((venue, index) => {
    return {
      ...venue,
      imgUrl: photos[index],
    };
  });
};
