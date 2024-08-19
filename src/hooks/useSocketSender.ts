import { useCallback } from "react";
import { useSocketRefStore } from "../store";
import { type Schema, event_type, type message_type } from "../type/schema";

export const useSocketSender = () => {
	const socketRef = useSocketRefStore((state) => state.socketRef);

	const sendData = useCallback(
		(
			mes_type: message_type,
			uuid: string,
			orientationDiff: { alpha: number; beta: number },
		) => {
			const data: Schema = {
				id: uuid,
				interval: 0,
				angle: {
					x: -orientationDiff.alpha,
					y: -orientationDiff.beta,
				},
				acceleration: {
					x: 0,
					y: 0,
					z: 0,
				},
				distance: {
					x: 0,
					y: 0,
					z: 0,
				},
				message_type: mes_type,
				event_type: event_type.shooter,
			};
			socketRef?.current?.send(JSON.stringify(data));
		},
		[socketRef],
	);

	return { sendData };
};
