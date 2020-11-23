const verifyGoogleToken = require("../../src/utils/googleAuth");

verifyGoogleToken = (token) => {
  return {
    sub: "123fggggg",
    email: "marinabulic1@gmail.com",
    name: "Marina Bulic",
  };
};

module.exports = verifyGoogleToken;
