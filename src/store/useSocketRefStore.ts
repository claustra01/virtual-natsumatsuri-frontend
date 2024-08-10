import { create } from "zustand";
import type { MutableRefObject } from "react";

type State = {
  socketRef: MutableRefObject<WebSocket | undefined> | null;
};

type Action = {
  setRef: (ref: MutableRefObject<WebSocket | undefined>) => void;
};

export const useSocketRefStore = create<State & Action>()((set) => ({
  socketRef: null,
  setRef: (ref) => set(() => ({ socketRef: ref })),
}));
