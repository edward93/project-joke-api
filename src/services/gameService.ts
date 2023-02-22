import { Game, PromptWhatTheySaid, PromptWhatWereTheyDoing, PromptWhere, PromptWho, PromptWhoSawThem, PromptWithWhom } from "./gameTypes";

/**
 * CHecks if all players in the current game are ready
 * @param gameObj - Current game object
 * @returns True if all players are ready, false otherwise
 */
export const allPlayersReady = (gameObj: Game) => {
  // game obj must be valid
  if (!gameObj) return false;

  // iterate over all players and return false if one of them is not ready yet
  for (const id in gameObj.players) {
    const player = gameObj.players[id];

    if (!player.ready) return false;
  }

  // if everything is fine return true
  return true;
};

/**
 * Create game sheets for every player
 *
 * @param game - Current game obj
 * @returns {[boolean, any]} [success/fail, game obj]
 */
export const createGameSheets = (game: Game) => {
  // game obj must be present
  if (!game) {
    // throw new Error("Game object has to be present");
    return [false, undefined];
  }

  // init the game sheets array if it's undefined
  if (!game.gameSheets) game.gameSheets = {};

  for (const id in game.players) {
    // let sheetIndex = 1;
    const player = game.players[id];

    game.gameSheets[id] = { owner: id, prompts: [] };
  }

  // return
  return [true, game];
};

/**
 * Creates and returns list of prompts
 * @returns {Types.GamePrompt[]} list of game prompts
 */
export const initPrompts = () => {
  const gamePrompts = [
    {
      id: 1,
      prompt: PromptWho,
    },
    {
      id: 2,
      prompt: PromptWithWhom,
    },
    {
      id: 3,
      prompt: PromptWhere,
    },
    {
      id: 4,
      prompt: PromptWhatWereTheyDoing,
    },
    {
      id: 5,
      prompt: PromptWhoSawThem,
    },
    {
      id: 6,
      prompt: PromptWhatTheySaid,
    },
  ];

  return gamePrompts;
};
