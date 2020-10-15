const { OAuth2Client } = require("google-auth-library");

const config = require("../../config");

const client = new OAuth2Client(config.GOOGLE_AUDIENCE);

const verifyGoogleToken = async (googleToken) => {
  const ticket = await client.verifyIdToken({
    idToken: googleToken,
    audience: config.GOOGLE_AUDIENCE,
  });
  const payload = ticket.getPayload();

  const { name, email, sub } = payload;
  const userObject = { name, email, sub };
  return userObject;
};

module.exports = verifyGoogleToken;
