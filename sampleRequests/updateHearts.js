const axios = require("axios");
const { PORT } = require("../config/constants");

async function updateHearts() {
  try {
    const id = 2;
    const hearts = 9;

    const response = await axios.patch(
      `http://localhost:${PORT}/artworks/${id}`,
      {
        hearts,
      }
    );
    console.log(response.data);
  } catch (e) {
    console.log(e);
  }
}

updateHearts();
