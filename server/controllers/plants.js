const axios = require("axios");
const config = require("../utils/config");
const plantsRouter = require("express").Router();

plantsRouter.get("/search", async (request) => {
  const query = request.query.q;

  const trefleResponse = await axios.get(
    `https://perenual.com/api/species-list?q=${query}&key=${config.PERENUAL_KEY}`
  );

  console.log(trefleResponse.data);
});

plantsRouter.get("/:id", async (request) => {
  const id = request.params.id;

  const trefleResponse = await axios.get(
    `https://perenual.com/api/species/details/${id}?key=${config.PERENUAL_KEY}`
  );

  console.log(trefleResponse.data);
});

module.exports = plantsRouter;
