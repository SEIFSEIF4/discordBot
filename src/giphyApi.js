const axios = require("axios");
require("dotenv").config();

const apiKey = process.env.GIPHY_API_KEY;
const apiUrl = "https://api.giphy.com/v1/gifs/random";

// fetch a random GIF & return it to URL of a specific category
const getRandomGifUrl = async (category = "animal") => {
  try {
    const response = await axios.get(
      `${apiUrl}?api_key=${apiKey}&tag=${category}`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching random GIF:", error.message);
    return null;
  }
};

exports.getRandomGifUrl = getRandomGifUrl;
