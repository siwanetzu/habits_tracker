import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { Shield, Sword, Wand2 } from 'lucide-react';

const CHARACTER_CLASSES = [
  { name: 'Warrior', icon: Sword },
  { name: 'Mage', icon: Wand2 },
  { name: 'Guardian', icon: Shield },
];

const AVATARS = [
  'https://images.unsplash.com/photo-1578353022142-09264fd64295?w=150&h=150&fit=crop', // Knight in armor
  'https://images.unsplash.com/photo-1514944288352-fffac99f0bdf?w=150&h=150&fit=crop', // Magical staff wielder
  'https://images.unsplash.com/photo-1595967444215-4901e8436909?w=150&h=150&fit=crop', // Fantasy warrior
];

export default function CharacterCreation() {
  const { character, updateCharacter } = useGame();
  const [name, setName] = useState(character.name);
  const [selectedClass, setSelectedClass] = useState(character.class);
  const [selectedAvatar, setSelectedAvatar] = useState(character.avatar);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateCharacter({
      ...character,
      name,
      class: selectedClass,
      avatar: selectedAvatar,
    });
  };

  if (character.name) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6">Create Your Character</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Character Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Choose Class
            </label>
            <div className="grid grid-cols-3 gap-4">
              {CHARACTER_CLASSES.map(({ name: className, icon: Icon }) => (
                <button
                  key={className}
                  type="button"
                  onClick={() => setSelectedClass(className)}
                  className={`p-4 rounded-lg border-2 flex flex-col items-center ${
                    selectedClass === className
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200'
                  }`}
                >
                  <Icon className="w-8 h-8 mb-2" />
                  <span className="text-sm">{className}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Choose Avatar
            </label>
            <div className="grid grid-cols-3 gap-4">
              {AVATARS.map((avatar) => (
                <button
                  key={avatar}
                  type="button"
                  onClick={() => setSelectedAvatar(avatar)}
                  className={`relative rounded-lg overflow-hidden aspect-square ${
                    selectedAvatar === avatar
                      ? 'ring-4 ring-blue-500'
                      : ''
                  }`}
                >
                  <img
                    src={avatar}
                    alt="Avatar option"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            disabled={!name || !selectedClass || !selectedAvatar}
          >
            Start Your Journey
          </button>
        </form>
      </div>
    </div>
  );
}