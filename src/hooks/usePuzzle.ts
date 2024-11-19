import { useState, useCallback } from 'react';
import { Chess } from 'chess.js';
import type { Square } from 'chess.js';
import type { PuzzleData, PuzzleState } from '../types/puzzle';
import type { LichessResponse } from '../types/lichess';

export function usePuzzle() {
  const [game, setGame] = useState(new Chess());
  const [puzzleState, setPuzzleState] = useState<PuzzleState>({
    status: 'loading',
    currentMoveIndex: 0,
    puzzle: null,
  });

  const fetchPuzzle = async () => {
    try {
      setPuzzleState(prev => ({ ...prev, status: 'loading' }));
      const response = await fetch('https://lichess.org/api/puzzle/daily', {
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: LichessResponse = await response.json();
      
      // Initialize the game with the puzzle position
      const tempGame = new Chess();
      tempGame.loadPgn(data.game.pgn);
      
      // Navigate to the position where the puzzle starts
      const moves = tempGame.history();
      const puzzleStartIndex = data.puzzle.initialPly - 1;
      
      const newGame = new Chess();
      for (let i = 0; i <= puzzleStartIndex; i++) {
        newGame.move(moves[i]);
      }

      const puzzle: PuzzleData = {
        id: data.puzzle.id,
        fen: newGame.fen(),
        moves: data.puzzle.solution,
        rating: data.puzzle.rating,
        themes: data.puzzle.themes,
        initialMove: moves[puzzleStartIndex],
        players: {
          white: `${data.game.players[0].title || ''} ${data.game.players[0].name}`,
          black: `${data.game.players[1].title || ''} ${data.game.players[1].name}`,
        },
      };

      setGame(newGame);
      setPuzzleState({
        status: 'ready',
        currentMoveIndex: 0,
        puzzle,
      });
    } catch (error) {
      console.error('Error fetching puzzle:', error);
      setPuzzleState(prev => ({ 
        ...prev, 
        status: 'failed',
        puzzle: null,
        error: error instanceof Error ? error.message : 'Failed to fetch puzzle',
      }));
    }
  };

  const makeMove = useCallback((sourceSquare: Square, targetSquare: Square) => {
    const { puzzle, currentMoveIndex, status } = puzzleState;
    if (!puzzle || status === 'loading' || status === 'solved') return false;

    try {
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q',
      });

      if (!move) return false;

      const expectedMove = puzzle.moves[currentMoveIndex];
      const moveString = `${sourceSquare}${targetSquare}`;

      if (moveString === expectedMove) {
        setGame(new Chess(game.fen()));
        
        if (currentMoveIndex === puzzle.moves.length - 1) {
          setPuzzleState(prev => ({ ...prev, status: 'solved' }));
        } else {
          const computerMove = puzzle.moves[currentMoveIndex + 1];
          const from = computerMove.substring(0, 2) as Square;
          const to = computerMove.substring(2, 4) as Square;
          
          setTimeout(() => {
            const updatedGame = new Chess(game.fen());
            updatedGame.move({ from, to });
            setGame(updatedGame);
            setPuzzleState(prev => ({
              ...prev,
              currentMoveIndex: prev.currentMoveIndex + 2,
            }));
          }, 500);
        }
        return true;
      } else {
        game.undo(); // Undo the incorrect move
        setGame(new Chess(game.fen()));
        setPuzzleState(prev => ({ ...prev, status: 'failed' }));
        return false;
      }
    } catch (error) {
      console.error('Error making move:', error);
      return false;
    }
  }, [game, puzzleState]);

  const resetPuzzle = useCallback(() => {
    if (!puzzleState.puzzle) return;
    const newGame = new Chess();
    newGame.load(puzzleState.puzzle.fen);
    setGame(newGame);
    setPuzzleState(prev => ({
      ...prev,
      status: 'ready',
      currentMoveIndex: 0,
    }));
  }, [puzzleState.puzzle]);

  return {
    game,
    puzzleState,
    fetchPuzzle,
    makeMove,
    resetPuzzle,
  };
}