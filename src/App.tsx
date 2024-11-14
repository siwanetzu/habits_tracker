import React, { useState } from 'react';
import { GameProvider } from './context/GameContext';
import LoadingScreen from './components/LoadingScreen';
import CharacterCreation from './components/CharacterCreation';
import CharacterStats from './components/CharacterStats';
import HabitList from './components/HabitList';
import RewardList from './components/RewardList';
import { Sword, Gift } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('habits');

  return (
    <GameProvider>
      <div className="min-h-screen bg-gray-100">
        <LoadingScreen />
        <CharacterCreation />
        <div className="max-w-4xl mx-auto p-6">
          <div className="mb-8">
            <CharacterStats />
          </div>

          <div className="mb-6">
            <nav className="flex gap-4">
              <button
                onClick={() => setActiveTab('habits')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  activeTab === 'habits'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Sword size={20} />
                Habits
              </button>
              <button
                onClick={() => setActiveTab('rewards')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  activeTab === 'rewards'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Gift size={20} />
                Rewards
              </button>
            </nav>
          </div>

          {activeTab === 'habits' ? <HabitList /> : <RewardList />}
        </div>
      </div>
    </GameProvider>
  );
}

export default App;