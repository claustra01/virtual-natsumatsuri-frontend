import { create } from "zustand";
import { TargetStatus } from "../type/target";

type State = {
	targetStatus: TargetStatus[];
};

type Action = {
	updateTargetStatus: (index: number, status: TargetStatus) => void;
	resetTargetStatus: () => void;
};

export const useTargetStatusStore = create<State & Action>((set) => ({
	// left, center, right
	targetStatus: [TargetStatus.Live, TargetStatus.Live, TargetStatus.Live],
	updateTargetStatus: (index: number, status: TargetStatus) =>
		set((state) => {
			const targetStatus = [...state.targetStatus];
			targetStatus[index] = status;
			return { targetStatus };
		}),
	resetTargetStatus: () =>
		set(() => ({
			targetStatus: [TargetStatus.Live, TargetStatus.Live, TargetStatus.Live],
		})),
}));
