import React from 'react';
import { useGame } from '../context/GameContext';
import { Trophy, Star } from 'lucide-react';

export default function CharacterStats() {
  const { character } = useGame();
  const XP_PER_LEVEL = 100;
  const progress = (character.xp / XP_PER_LEVEL) * 100;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-4">
        <img
          src={character.avatar}
          alt={character.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h2 className="text-xl font-bold">{character.name}</h2>
          <p className="text-gray-600">Level {character.level} {character.class}</p>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2">
          <Trophy className="text-yellow-500" size={20} />
          <span className="text-sm font-medium">Level {character.level}</span>
        </div>
        <div className="flex items-center gap-2">
          <Star className="text-blue-500" size={20} />
          <span className="text-sm font-medium">{character.xp} / {XP_PER_LEVEL} XP</span>
        </div>
        <div className="relative pt-1">
          <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-100">
            <div
              style={{ width: `${progress}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
}