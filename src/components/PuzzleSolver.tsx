import { useEffect } from 'react';
import { ChessBoard } from './ChessBoard';
import { PuzzleInfo } from './PuzzleInfo';
import { PuzzleStatus } from './PuzzleStatus';
import { usePuzzle } from '../hooks/usePuzzle';

export function PuzzleSolver() {
  const { game, puzzleState, fetchPuzzle, makeMove, resetPuzzle } = usePuzzle();

  useEffect(() => {
    fetchPuzzle();
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <PuzzleInfo puzzle={puzzleState.puzzle} />
      <div className="flex flex-col items-center gap-4">
        <ChessBoard 
          position={game.fen()}
          onPieceDrop={makeMove}
        />
        <div className="w-full max-w-2xl">
          <PuzzleStatus 
            status={puzzleState.status}
            onReset={resetPuzzle}
            onNewPuzzle={fetchPuzzle}
          />
        </div>
      </div>
    </div>
  );
}