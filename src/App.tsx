import { PuzzleSolver } from './components/PuzzleSolver';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Chess Puzzle Trainer
        </h1>
        <PuzzleSolver />
      </div>
    </div>
  );
}

export default App;