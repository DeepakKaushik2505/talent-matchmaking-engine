// src/store/useTalentStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useTalentStore = create(
  persist(
    (set, get) => ({
      talents: [],

      addTalent: (newTalent) =>
        set((state) => ({
          talents: [...state.talents, newTalent],
        })),

      getTalentById: (id) => {
        return get().talents.find((talent) => talent.id === id);
      },
    }),
    {
      name: 'talent-store',
      getStorage: () => localStorage,
    }
  )
);
