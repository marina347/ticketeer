const http = require("http");
const config = require("../config");
const app = require("./app");

const port = config.PORT;

const server = http.createServer(app);

require("./utils/io")(server);

server.listen(port, () => {
  console.log("Server is running");
});
