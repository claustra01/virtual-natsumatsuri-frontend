import { useEffect } from "react";
import { useSocketRefStore } from "../store";
import { PointerSchema, ActionSchema, HitSchema } from "../type/shooting";

export const useSocketReciever = () => {
	const socketRef = useSocketRefStore((state) => state.socketRef);

	const onMessage = (handler: (data: (PointerSchema | ActionSchema | HitSchema)) => void) => {
		useEffect(() => {
			const onMessage = (event: MessageEvent) => {
				const data = JSON.parse(event.data);
				handler(data);
			};

			const currentSocketRef = socketRef?.current;
			currentSocketRef?.addEventListener("message", onMessage);
			return () => {
				currentSocketRef?.removeEventListener("message", onMessage);
			};
		}, [socketRef, handler]);
	};

	return { onMessage };
};
