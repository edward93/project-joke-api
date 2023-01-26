const { v4: uuidv4 } = require("uuid");

const users = {};
const games = {};

const connection = (socket) => {
  // socket.on("userCreated", (user) => {
  //   users[socket.id] = user;
  // });

  // create a new game
  socket.on("create-game", (user) => {
    const gameSessionId = uuidv4();
    users[socket.id] = user;

    console.log(
      `Game session with unique ${gameSessionId} session id has been created by ${user}`
    );

    games[gameSessionId] = 0;

    // let the client know about the game session id
    socket.emit("game-created", gameSessionId);
  });

  // join the game
  socket.on("join-game", (gameSessionId) => {
    socket.join(gameSessionId);
    games[gameSessionId]++;
    console.log(
      `User (${users[socket.id]}) has joined the game ${gameSessionId}`
    );
    console.log(games);
  });

  socket.on("leave-game", (gameSessionId) => {
    socket.leave(gameSessionId);
    games[gameSessionId]--;
    console.log(
      `User (${users[socket.id]}) has left the game ${gameSessionId}`
    );
    console.log(games);
  });

  socket.on("message", (msg) => {
    console.log("Received a message from one user ", msg);

    io.emit("message", msg);
  });

  socket.on("disconnect", () => {
    console.log("user has disconnected");
  });
};

module.exports = connection;
