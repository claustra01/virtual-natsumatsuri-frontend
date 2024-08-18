import { create } from "zustand";

type State = {
	score: number;
};

type Action = {
	setScore: (score: number) => void;
	addOneScore: () => void;
};

export const useScoreStore = create<State & Action>()((set) => ({
	score: 0,
	setScore: (score) => set(() => ({ score: score })),
	addOneScore: () => set((state) => ({ score: state.score + 1 })),
}));
