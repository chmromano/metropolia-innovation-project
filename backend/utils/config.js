require("dotenv").config();

const PORT = process.env.PORT;

const TREFLE_TOKEN = process.env.TREFLE_TOKEN;

const PERENUAL_KEY = process.env.PERENUAL_KEY;

module.exports = {
  PORT,
  TREFLE_TOKEN,
  PERENUAL_KEY,
};
