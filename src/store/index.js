import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTalentStore = create(
  persist(
    (set, get) => ({
      talents: [],
      _nextId: 0, // Add a counter for unique IDs

      addTalent: (newTalent) =>
        set((state) => {
          const newId = `talent-${Date.now()}-${state._nextId++}`;
          return {
            talents: [
              ...state.talents,
              {
                ...newTalent,
                id: newId, // Use the unique ID
                budget: newTalent.budget || "0",
              },
            ],
          };
        }),

      getTalentById: (id) => {
        return get().talents.find((talent) => talent.id === id);
      },
    }),
    {
      name: "talent-store",
      getStorage: () => localStorage,
    }
  )
);
