import { useSocketRefStore } from "../store";
import type { ActionSchema, HitSchema, PointerSchema } from "../type/shooting";

export const useSocketReceiver = () => {
	const socketRef = useSocketRefStore((state) => state.socketRef);

	const onMessage = (
		handler: (data: PointerSchema | ActionSchema | HitSchema) => void,
	) => {
		const onMessage = (event: MessageEvent) => {
			const data = JSON.parse(event.data);
			handler(data);
		};
		const currentSocketRef = socketRef?.current;
		currentSocketRef?.addEventListener("message", onMessage);
		return () => {
			currentSocketRef?.removeEventListener("message", onMessage);
		};
	};

	return { onMessage };
};
