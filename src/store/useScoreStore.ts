import create from "zustand";

type Store = {
	score: number;
	setScore: (updater: (prevScore: number) => number) => void;
};

export const useScoreStore = create<Store>((set) => ({
	score: 0,
	setScore: (updater) => set((state) => ({ score: updater(state.score) })),
}));
