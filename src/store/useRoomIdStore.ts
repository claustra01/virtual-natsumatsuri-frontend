import { create } from "zustand";
import { generateUUID } from "../utils/uuid";

type State = {
	uuid: string;
};

type Action = {
	updateUUID: () => void;
};

export const useRoomIdStore = create<State & Action>()((set) => ({
	uuid: generateUUID(),
	updateUUID: () => set(() => ({ uuid: generateUUID() })),
}));
