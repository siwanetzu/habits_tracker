import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { Plus, Trash2, CheckCircle } from 'lucide-react';

export default function HabitList() {
  const { habits, addHabit, removeHabit, completeHabit } = useGame();
  const [showForm, setShowForm] = useState(false);
  const [newHabit, setNewHabit] = useState({
    title: '',
    description: '',
    xpReward: 10,
    frequency: 'daily',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addHabit({
      ...newHabit,
      id: Date.now().toString(),
      completedDates: [],
    } as any);
    setNewHabit({ title: '', description: '', xpReward: 10, frequency: 'daily' });
    setShowForm(false);
  };

  const isHabitCompletedToday = (completedDates: string[]) => {
    const today = new Date().toISOString().split('T')[0];
    return completedDates.includes(today);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Habits</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          <Plus size={20} />
          Add Habit
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={newHabit.title}
              onChange={(e) => setNewHabit({ ...newHabit, title: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={newHabit.description}
              onChange={(e) => setNewHabit({ ...newHabit, description: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">XP Reward</label>
              <input
                type="number"
                value={newHabit.xpReward}
                onChange={(e) => setNewHabit({ ...newHabit, xpReward: Number(e.target.value) })}
                className="w-full px-3 py-2 border rounded-md"
                min="1"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
              <select
                value={newHabit.frequency}
                onChange={(e) => setNewHabit({ ...newHabit, frequency: e.target.value as any })}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
              </select>
            </div>
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
              Create Habit
            </button>
          </div>
        </form>
      )}

      <div className="grid gap-4">
        {habits.map((habit) => (
          <div
            key={habit.id}
            className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between"
          >
            <div className="flex-1">
              <h3 className="font-semibold">{habit.title}</h3>
              <p className="text-sm text-gray-600">{habit.description}</p>
              <div className="flex gap-2 mt-2">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {habit.xpReward} XP
                </span>
                <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                  {habit.frequency}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => completeHabit(habit.id)}
                disabled={isHabitCompletedToday(habit.completedDates)}
                className={`p-2 rounded-full ${
                  isHabitCompletedToday(habit.completedDates)
                    ? 'bg-green-100 text-green-600'
                    : 'bg-gray-100 hover:bg-green-100 text-gray-600 hover:text-green-600'
                }`}
              >
                <CheckCircle size={20} />
              </button>
              <button
                onClick={() => removeHabit(habit.id)}
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