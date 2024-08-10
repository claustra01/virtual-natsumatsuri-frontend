import { create } from "zustand";
import { persist } from "zustand/middleware";
import { generateUUID } from "../utils/uuid";

type State = {
	uuid: string;
};

type Action = {
	updateUUID: () => void;
};

export const useUUIDStore = create<State & Action>()(
	persist(
		(set) => ({
			uuid: generateUUID(),
			updateUUID: () => set(() => ({ uuid: generateUUID() })),
		}),
		{
			name: "user-uuid",
		},
	),
);
