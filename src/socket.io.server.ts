import { Server } from "socket.io";

import { connection } from "./services/socketConnectionHandler";

export const initSocketIoServer = (server: any) => {
  const io = new Server(server, { cors: { origin: "*" } });
  io.on("connection", (socket) => {
    connection(socket, io);
  });
};
