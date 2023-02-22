import http from "http";
import dotenv from "dotenv";
// init dotenv. Should be above all other imports that use dotenv
dotenv.config();

import { initSocketIoServer } from "./socket.io.server";
import app, { port } from "./app";

// create the http server
const server = http.createServer(app);

// create the socket io server
initSocketIoServer(server);

// start the http server
server.listen(port);
server.on("listening", () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr?.port;
  console.log(`
  🚀 Server ready at: ${bind}
  `);
});
server.on("error", (error: any) => {
  console.error(error);
});
