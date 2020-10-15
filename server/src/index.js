const express = require("express");
const cors = require("cors");

require("./db/mongoose");
const userRouter = require("./routers/user");
const boardRouter = require("./routers/board");
const laneRouter = require("./routers/lane");
const ticketRouter = require("./routers/ticket");
const config = require("../config");

const app = express();

const port = config.PORT;

app.use(express.json());
app.use(cors());
app.use(boardRouter);
app.use(laneRouter);
app.use(ticketRouter);
app.use(userRouter);

app.listen(port, () => {
  console.log("Server is running");
});
