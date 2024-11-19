import type { PuzzleData } from '../types/puzzle';

interface PuzzleInfoProps {
  puzzle: PuzzleData | null;
}

export function PuzzleInfo({ puzzle }: PuzzleInfoProps) {
  if (!puzzle) return null;

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold mb-2 text-center">Daily Puzzle</h2>
      <div className="bg-white rounded-lg shadow-md p-4 max-w-xl mx-auto">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-600">Rating</h3>
            <p className="text-lg">{puzzle.rating}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-600">Players</h3>
            <p className="text-sm">
              {puzzle.players?.white} vs {puzzle.players?.black}
            </p>
          </div>
        </div>
        <div className="mt-3">
          <h3 className="text-sm font-semibold text-gray-600">Themes</h3>
          <div className="flex flex-wrap gap-2 mt-1">
            {puzzle.themes.map((theme) => (
              <span
                key={theme}
                className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-700"
              >
                {theme}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}