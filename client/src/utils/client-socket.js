import socketIOClient from "socket.io-client";
import envVariables from "../env-variables";

let socket;

export const createSocket = (token) => {
  socket = socketIOClient(envVariables.REACT_APP_SERVER_PATH, {
    transports: ["websocket", "polling", "flashsocket"],
    query: { token },
    reconnectionAttempts: 5,
  });
};

export const closeSocket = () => {
  socket.close();
};

export const getSocket = () => {
  if (!socket) {
    throw new Error(
      "Must call createSocket function before you can get the socket instance"
    );
  }
  return socket;
};
