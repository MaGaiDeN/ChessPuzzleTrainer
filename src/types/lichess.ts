export interface LichessGame {
  clock: string;
  id: string;
  perf: {
    key: string;
    name: string;
  };
  pgn: string;
  players: {
    color: 'white' | 'black';
    id: string;
    name: string;
    rating: number;
    title?: string;
    patron?: boolean;
    flair?: string;
  }[];
  rated: boolean;
  fen: string;
  treeParts: {
    moves: string[];
  }[];
}

export interface LichessPuzzle {
  id: string;
  initialPly: number;
  plays: number;
  rating: number;
  solution: string[];
  themes: string[];
}

export interface LichessResponse {
  game: LichessGame;
  puzzle: LichessPuzzle;
}