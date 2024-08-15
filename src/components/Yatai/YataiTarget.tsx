import { useBox } from "@react-three/cannon";
import type { ThreeElements } from "@react-three/fiber";
import { useEffect, useState } from "react";
import type {
	BufferGeometry,
	Material,
	Mesh,
	NormalBufferAttributes,
	Object3DEventMap,
} from "three";
import { randFloat } from "three/src/math/MathUtils.js";
import { useSocketReceiver } from "../../hooks/useSocketReceiver";
import { useSocketSender } from "../../hooks/useSocketSender";
import { message_type } from "../../type/schema";
import {
	type ActionSchema,
	MessageType,
	type Target,
} from "../../type/shooting";

export const YataiTarget = (props: ThreeElements["mesh"]) => {
	const { sendData } = useSocketSender();
	const { onMessage } = useSocketReceiver();
	const position = props.position as [number, number, number];

	const args: [number, number, number] = [0.7, 2, 0.7];
	const [ref, api] = useBox(() => ({
		mass: 1,
		position: position,
		args: args,
	}));

	useEffect(() => {
		onMessage((data) => {
			if (data.message_type === MessageType.Action) {
				shotTarget(data);
			}
		});
	}, [onMessage]);

	// TODO: これらは一人用,いつかマルチプレイヤー対応する
	const [uuid, setUuid] = useState<string>("");
	const [target, setTarget] = useState<Target | undefined>(undefined);
	const shotTarget = (data: ActionSchema) => {
		setUuid(data.id);
		setTarget({ x: data.target.x, y: data.target.y });
	};

	useEffect(() => {
		if (!target) return;
		if (
			target.x * 8 > position[0] - args[0] / 2 &&
			target.x * 8 < position[0] + args[0] / 2 &&
			target.y * 8 > position[1] - args[1] / 2 - 2 &&
			target.y * 8 < position[1] + args[1] / 2 - 2
		) {
			api.applyImpulse(
				[randFloat(-2, 2), 4, 8],
				[randFloat(-1, 1), randFloat(-1, 1), randFloat(-1, 1)],
			);
			sendData(message_type.Hit, uuid, { alpha: 0, beta: 0 });
		}
	}, [uuid, target, position, api, sendData]);

	return (
		<mesh
			ref={
				ref as React.Ref<
					Mesh<
						BufferGeometry<NormalBufferAttributes>,
						Material | Material[],
						Object3DEventMap
					>
				>
			}
			{...props}
			castShadow
			receiveShadow
		>
			<boxGeometry args={[...args]} />
			<meshStandardMaterial color={"yellow"} />
		</mesh>
	);
};
