interface PuzzleStatusProps {
  status: 'loading' | 'ready' | 'solved' | 'failed';
  onReset: () => void;
  onNewPuzzle: () => void;
}

export function PuzzleStatus({ status, onReset, onNewPuzzle }: PuzzleStatusProps) {
  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-pulse text-gray-600">Loading puzzle...</div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded-lg text-center">
        <p className="font-bold mb-2">
          {status === 'failed' ? (
            <>
              Failed to load puzzle. Please try again.
              <button
                onClick={onNewPuzzle}
                className="ml-2 px-4 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
              >
                Retry
              </button>
            </>
          ) : (
            <>
              Incorrect move. Try again!
              <button
                onClick={onReset}
                className="ml-2 px-4 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
              >
                Reset Puzzle
              </button>
            </>
          )}
        </p>
      </div>
    );
  }

  if (status === 'solved') {
    return (
      <div className="bg-green-100 text-green-700 p-4 rounded-lg text-center">
        <p className="font-bold mb-2">Congratulations! Puzzle solved!</p>
        <button
          onClick={onNewPuzzle}
          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200"
        >
          Try Another Puzzle
        </button>
      </div>
    );
  }

  return null;
}