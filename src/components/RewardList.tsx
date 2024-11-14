import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { Plus, Trash2, Gift } from 'lucide-react';

export default function RewardList() {
  const { rewards, addReward, removeReward, claimReward, character } = useGame();
  const [showForm, setShowForm] = useState(false);
  const [newReward, setNewReward] = useState({
    title: '',
    description: '',
    cost: 100,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addReward({
      ...newReward,
      id: Date.now().toString(),
      claimed: false,
    });
    setNewReward({ title: '', description: '', cost: 100 });
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Rewards</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
        >
          <Plus size={20} />
          Add Reward
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={newReward.title}
              onChange={(e) => setNewReward({ ...newReward, title: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={newReward.description}
              onChange={(e) => setNewReward({ ...newReward, description: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cost (XP)</label>
            <input
              type="number"
              value={newReward.cost}
              onChange={(e) => setNewReward({ ...newReward, cost: Number(e.target.value) })}
              className="w-full px-3 py-2 border rounded-md"
              min="1"
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Create Reward
            </button>
          </div>
        </form>
      )}

      <div className="grid gap-4">
        {rewards.map((reward) => (
          <div
            key={reward.id}
            className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between"
          >
            <div className="flex-1">
              <h3 className="font-semibold">{reward.title}</h3>
              <p className="text-sm text-gray-600">{reward.description}</p>
              <span className="inline-block mt-2 text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                {reward.cost} XP
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => claimReward(reward.id)}
                disabled={reward.claimed || character.xp < reward.cost}
                className={`p-2 rounded-full ${
                  reward.claimed
                    ? 'bg-gray-100 text-gray-400'
                    : character.xp >= reward.cost
                    ? 'bg-purple-100 hover:bg-purple-200 text-purple-600'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                <Gift size={20} />
              </button>
              <button
                onClick={() => removeReward(reward.id)}
                className="p-2 rounded-full bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-600"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}