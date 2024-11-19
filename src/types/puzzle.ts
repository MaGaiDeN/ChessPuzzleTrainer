export interface PuzzleData {
  id: string;
  fen: string;
  moves: string[];
  rating: number;
  themes: string[];
  initialMove: string;
  players?: {
    white: string;
    black: string;
  };
}

export interface PuzzleState {
  status: 'loading' | 'ready' | 'solved' | 'failed';
  currentMoveIndex: number;
  puzzle: PuzzleData | null;
  error?: string;
}