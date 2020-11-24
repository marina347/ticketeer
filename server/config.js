module.exports = {
  NODE_ENV: process.env.NODE_ENV || "development",
  HOST: process.env.NODE_HOST || "127.0.0.1",
  PORT: process.env.NODE_PORT || 3001,
  DB_URL:
    process.env.MONGO_DB_URL || "mongodb://127.0.0.1:27017/ticketeer-api",
  JWT_SECRET: process.env.NODE_JWT_SECRET || "my_mega_secret",
  CRYPTO_KEY: process.env.NODE_CRYPTO_KEY || "my_crypto_key",
};
