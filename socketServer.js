const connection = require("./services/socketConnectionHandler");

const server = (io) => {
  io.on("connection", connection);
};

module.exports = server;
