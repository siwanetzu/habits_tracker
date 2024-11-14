import React, { createContext, useContext, useState, useEffect } from 'react';
import { Character, Habit, Reward, GameContext as GameContextType } from '../types';

const XP_PER_LEVEL = 100;

const defaultCharacter: Character = {
  name: '',
  level: 1,
  xp: 0,
  class: '',
  avatar: '',
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [character, setCharacter] = useState<Character>(() => {
    const saved = localStorage.getItem('character');
    return defaultCharacter;
  });

  const [habits, setHabits] = useState<Habit[]>(() => {
    const saved = localStorage.getItem('habits');
    return saved ? JSON.parse(saved) : [];
  });

  const [rewards, setRewards] = useState<Reward[]>(() => {
    const saved = localStorage.getItem('rewards');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (character.name) {
      localStorage.setItem('character', JSON.stringify(character));
      localStorage.setItem('habits', JSON.stringify(habits));
      localStorage.setItem('rewards', JSON.stringify(rewards));
    }
  }, [character, habits, rewards]);

  const resetGame = () => {
    setCharacter(defaultCharacter);
  };

  const loadSavedCharacter = () => {
    const saved = localStorage.getItem('character');
    if (saved) {
      setCharacter(JSON.parse(saved));
    }
  };

  const updateCharacter = (newCharacter: Character) => {
    setCharacter(newCharacter);
  };

  const addHabit = (habit: Habit) => {
    setHabits([...habits, habit]);
  };

  const removeHabit = (id: string) => {
    setHabits(habits.filter(h => h.id !== id));
  };

  const completeHabit = (id: string) => {
    const habit = habits.find(h => h.id === id);
    if (!habit) return;

    const today = new Date().toISOString().split('T')[0];
    if (habit.completedDates.includes(today)) return;

    const newHabits = habits.map(h =>
      h.id === id
        ? { ...h, completedDates: [...h.completedDates, today] }
        : h
    );

    let newXp = character.xp + habit.xpReward;
    let newLevel = character.level;

    while (newXp >= XP_PER_LEVEL) {
      newXp -= XP_PER_LEVEL;
      newLevel++;
    }

    setHabits(newHabits);
    setCharacter({ ...character, xp: newXp, level: newLevel });
  };

  const addReward = (reward: Reward) => {
    setRewards([...rewards, reward]);
  };

  const removeReward = (id: string) => {
    setRewards(rewards.filter(r => r.id !== id));
  };

  const claimReward = (id: string) => {
    const reward = rewards.find(r => r.id === id);
    if (!reward || reward.claimed || character.xp < reward.cost) return;

    setRewards(
      rewards.map(r =>
        r.id === id ? { ...r, claimed: true } : r
      )
    );
    setCharacter({ ...character, xp: character.xp - reward.cost });
  };

  return (
    <GameContext.Provider
      value={{
        character,
        habits,
        rewards,
        updateCharacter,
        addHabit,
        removeHabit,
        completeHabit,
        addReward,
        removeReward,
        claimReward,
        resetGame,
        loadSavedCharacter,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}