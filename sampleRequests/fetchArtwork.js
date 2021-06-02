const axios = require("axios");
const { PORT } = require("../config/constants");

async function fetchArtworks() {
  const response = await axios.get(`http://localhost:${PORT}/artworks`);

  console.log("RESPONSE FROM SERVER", response.data);
}

fetchArtworks();
