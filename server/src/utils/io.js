const jwt = require("jsonwebtoken");
const config = require("./../../config");

let ioInstance;

module.exports = function (server) {
  const io = require("socket.io")(server);

  io.use(function (socket, next) {
    if (socket.handshake.query && socket.handshake.query.token) {
      jwt.verify(
        socket.handshake.query.token,
        config.JWT_SECRET,
        function (err, decoded) {
          if (err) {
            return next(new Error("Authentication error"));
          }
          socket.decoded = decoded;
          next();
        }
      );
    } else {
      next(new Error("Authentication error"));
    }
  }).on("connection", (socket) => {
    socket.on("join", ({ boardId, userId }) => {
      console.log("User " + userId + " connected");
      socket.join(boardId);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
  ioInstance = io;
  return io;
};

module.exports.getIO = () => {
  if (!ioInstance) {
    throw new Error(
      "Must call module constructor function before you can get the IO instance"
    );
  }
  return ioInstance;
};
