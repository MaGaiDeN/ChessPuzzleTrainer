import { Chessboard } from 'react-chessboard';
import type { Square } from 'chess.js';

interface ChessBoardProps {
  position: string;
  onPieceDrop: (sourceSquare: Square, targetSquare: Square) => boolean;
}

export function ChessBoard({ position, onPieceDrop }: ChessBoardProps) {
  return (
    <div className="w-[600px] max-w-full aspect-square">
      <Chessboard 
        position={position}
        onPieceDrop={onPieceDrop}
        boardWidth={600}
        customBoardStyle={{
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        }}
        customDarkSquareStyle={{ backgroundColor: '#779952' }}
        customLightSquareStyle={{ backgroundColor: '#edeed1' }}
        areArrowsAllowed={true}
        showBoardNotation={true}
      />
    </div>
  );
}