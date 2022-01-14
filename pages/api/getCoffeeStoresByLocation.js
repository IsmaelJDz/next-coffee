// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { fetchCoffeeStore } from "../../lib/coffee-stores";

const getCoffeeStoresByLocation = async (req, res) => {
  try {
    const { latLong, limit } = req.query;

    const response = await fetchCoffeeStore(latLong, limit);
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export default getCoffeeStoresByLocation;
