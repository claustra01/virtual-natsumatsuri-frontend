import create from "zustand";

type Store = {
	score: number;
};

type Action = {
	setScore: (score: number) => void;
	addOneScore: () => void;
};

export const useScoreStore = create<Store & Action>((set) => ({
	score: 0,
	setScore: (score) => set(() => ({ score: score })),
	addOneScore: () => set((state) => ({ score: state.score + 1 })),
}));
