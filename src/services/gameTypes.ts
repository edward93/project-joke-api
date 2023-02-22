/**
   * Enum describing different game states
   */
export enum GameState {
  // Waiting for players
  WAITING = "WAITING",

  // All players are ready
  READY = "READY",

  // Game has started, typically followed quickly after "READY"
  STARTED = "STARTED",

  // Game has finished
  FINISHED = "FINISHED",
}

/**
 * User interface
 */
export type User = {
  id: string;
  username: string;
};

/**
 * Player type
 */
export interface Player extends User {
  ready: boolean;
}

/**
 * Game obj
 */
export type Game = {
  /**
   * unique id
   */
  id: string;

  /**
   * UserId of the host
   */
  host: string;

  /**
   * List of player ids who are joined this game
   */
  players: { [id: string]: Player };

  /**
   * List of gameSheets, one per player
   */
  gameSheets: { [id: string]: GameSheet };

  /**
   * Current game state
   */
  state: GameState;
};

/**
 * Question prompt type
 */
export type PromptType = {
  /**
   * Id of the prompt
   */
  id: number;

  /**
   * Actual question of the prompt
   */
  question: string;

  /**
   * Static text used for final story construction
   */
  staticText: string;
};

//#region prompt values
export const PromptWho: PromptType = {
  id: 1,
  question: "Who?",
  staticText: "",
};

export const PromptWithWhom: PromptType = {
  id: 2,
  question: "With whom?",
  staticText: " with ",
};

export const PromptWhere: PromptType = {
  id: 3,
  question: "Where?",
  staticText: " ",
};

export const PromptWhatWereTheyDoing: PromptType = {
  id: 4,
  question: "What were they doing?",
  staticText: " ",
};

export const PromptWhoSawThem: PromptType = {
  id: 5,
  question: "Who saw them?",
  staticText: " saw them",
};

export const PromptWhatTheySaid: PromptType = {
  id: 6,
  question: "What they said?",
  staticText: " and said - ",
};
//#endregion

/**
 * Prompts
 */
export type Prompt =
  | typeof PromptWho
  | typeof PromptWithWhom
  | typeof PromptWhere
  | typeof PromptWhatWereTheyDoing
  | typeof PromptWhoSawThem
  | typeof PromptWhatTheySaid;

/**
 * Questions type
 */
export type GamePrompt = {
  id: number;
  prompt: Prompt;
  answer?: string;
  answeredBy?: string;
  prevAnsweredBy?: string;
};

/**
 * Game sheet type
 */
export type GameSheet = {
  owner: string;
  prompts: GamePrompt[];
};

/**
 * Users map type
 */
export type UsersMap = {
  [id: string]: User;
}

export type GamesMap = {
  [id: string]: Game;
}