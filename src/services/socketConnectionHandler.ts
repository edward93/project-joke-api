import { v4 as uuidv4 } from "uuid";
import { Server, Socket } from "socket.io";

import { Game, GamesMap, GameState, UsersMap } from "./gameTypes";
import { allPlayersReady, createGameSheets } from "./gameService";

const users: UsersMap = {};
const games: GamesMap = {};

export const connection = (socket: Socket, io: Server) => {
  // new user has joined
  socket.on("new user", (username) => {
    const user = { id: socket.id, username };
    users[socket.id] = user;

    // broadcast new user
    io.emit("new user", user);
  });

  // create new game event received
  socket.on("create new game", async () => {
    const gameId = uuidv4();

    // current user id
    const currentUserId = socket.id;

    // get current user
    const currentUser = users[currentUserId];

    const game: Game = {
      id: gameId,
      host: currentUserId,
      state: GameState.WAITING,
      players: { [currentUserId]: { ...currentUser, ready: false } },
      gameSheets: {}
    };

    games[gameId] = game;

    // let the client know about the game session id
    socket.emit("game created", game);
    // io.emit("game created", game);

    // current user automatically joins the game
    await socket.join(gameId);

    console.log(`New game was created: `, game);
  });

  // new user joined a particular game
  socket.on("join game", async (gameId) => {
    const game = games[gameId];
    const currentUserId = socket.id;
    // get current user
    const currentUser = users[currentUserId];

    game.players[currentUserId] = { ...currentUser, ready: false };

    // join this particular game
    await socket.join(gameId);

    // notify everyone in that session about the new user
    io.to(gameId).emit("joined game", { userId: socket.id, game });

    console.log(`Joined Game: `, { userId: socket.id, game });
  });

  // player is ready
  socket.on("ready player", ({ gameId, userId }) => {
    const game = games[gameId];

    game.players[userId].ready = true;

    if (allPlayersReady(game)) {
      // TODO: emit state changes
      game.state = GameState.READY;
    }

    io.to(gameId).emit("player ready", game);

    console.log(`Player (${userId}) is ready`, game);
  });

  // game has been started by the host
  socket.on("start game", (gameId, userId) => {
    const game = games[gameId];

    // TODO: check if the user who started this game is the host
    // update the game state
    game.state = GameState.STARTED;

    // init game sheets
    createGameSheets(game);

    io.to(gameId).emit("game started", game);

    console.log(`Player ${userId} has started the game`, game);
  });

  socket.on("disconnect", () => {
    console.log("user has disconnected");
  });
};
