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
	addOneScore: () =>
		set((state) => {
			if (state.score > 3) {
				return { score: 3 };
			}
			return { score: state.score + 1 };
		}),
}));
