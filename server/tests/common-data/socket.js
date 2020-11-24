const config = require("../../config");
const http = require("http");
const app = require("../../src/app");

const port = config.PORT;
let server;

const startServer = async () => {
  server = http.createServer(app);
  require("../../src/utils/io")(server);
  server.listen(port, () => {
    console.log("Server is running");
  });
};

const closeConnections = async () => {
  require("../../src/utils/io").getIO().close();
  server.close();
};

module.exports = {
  startServer,
  closeConnections,
};
