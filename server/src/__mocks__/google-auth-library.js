class OAuth2Client {
  clientId;
  constructor(clientId) {
    this.clientId = clientId;
  }
  verifyIdToken({ obj }) {
    return Promise.resolve(new LoginTicket());
  }
}

class LoginTicket {
  getPayload() {
    return {
      sub: "11112333",
      email: "test@gmail.com",
      name: "Marina",
    };
  }
}

module.exports = {
  OAuth2Client,
};
