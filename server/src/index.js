const express = require("express");
const cors = require("cors");
const http = require("http");
require("./db/mongoose");

const userRouter = require("./routers/user");
const boardRouter = require("./routers/board");
const laneRouter = require("./routers/lane");
const ticketRouter = require("./routers/ticket");
const config = require("../config");

const app = express();

const port = config.PORT;

const server = http.createServer(app);

require("./utils/io")(server);

app.use(express.json());
app.use(cors());
app.use(boardRouter);
app.use(laneRouter);
app.use(ticketRouter);
app.use(userRouter);

server.listen(port, () => {
  console.log("Server is running");
});
