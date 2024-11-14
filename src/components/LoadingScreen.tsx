import React from 'react';
import { useGame } from '../context/GameContext';
import { Gamepad2, Plus, Download } from 'lucide-react';

export default function LoadingScreen() {
  const { character, resetGame, loadSavedCharacter } = useGame();
  const savedCharacter = localStorage.getItem('character');
  const hasCharacter = character.name !== '';

  if (hasCharacter) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <Gamepad2 className="w-16 h-16 text-white mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white mb-2">RPG Habits</h1>
          <p className="text-blue-200">Level up your life, one habit at a time</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={resetGame}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-6 py-3 flex items-center justify-center gap-2 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Create New Character
          </button>

          {savedCharacter && (
            <button
              onClick={loadSavedCharacter}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white rounded-lg px-6 py-3 flex items-center justify-center gap-2 transition-colors"
            >
              <Download className="w-5 h-5" />
              Load Saved Character
            </button>
          )}
        </div>
      </div>
    </div>
  );
}