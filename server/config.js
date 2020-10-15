const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.resolve(__dirname, process.env.NODE_ENV + ".env"),
});

module.exports = {
  NODE_ENV: process.env.NODE_ENV || "development",
  HOST: process.env.HOST || "127.0.0.1",
  PORT: process.env.PORT || 3001,
  DB_URL: process.env.DB_URL || "mongodb://127.0.0.1:27017/ticketeer-api",
  JWT_SECRET: process.env.JWT_SECRET || "my_mega_secret",
  CRYPTO_KEY: process.env.CRYPTO_KEY || "my_crypto_key",
};
