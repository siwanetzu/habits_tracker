export interface Character {
  name: string;
  level: number;
  xp: number;
  class: string;
  avatar: string;
}

export interface Habit {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  frequency: 'daily' | 'weekly';
  completedDates: string[];
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  cost: number;
  claimed: boolean;
}

export interface GameContext {
  character: Character;
  habits: Habit[];
  rewards: Reward[];
  updateCharacter: (character: Character) => void;
  addHabit: (habit: Habit) => void;
  removeHabit: (id: string) => void;
  completeHabit: (id: string) => void;
  addReward: (reward: Reward) => void;
  removeReward: (id: string) => void;
  claimReward: (id: string) => void;
  resetGame: () => void;
  loadSavedCharacter: () => void;
}