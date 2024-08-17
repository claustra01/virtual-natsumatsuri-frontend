import { useBox } from "@react-three/cannon";
import type { ThreeElements } from "@react-three/fiber";
import { useEffect, useMemo, useState } from "react";
import type {
	BufferGeometry,
	Material,
	Mesh,
	NormalBufferAttributes,
	Object3DEventMap,
} from "three";
import { randFloat } from "three/src/math/MathUtils.js";
import { type TargetProperty, initialTargets } from "../../const/target";
import { useSocketReceiver } from "../../hooks/useSocketReceiver";
import { useSocketSender } from "../../hooks/useSocketSender";
import { useTargetStatusStore } from "../../store";
import { message_type } from "../../type/schema";
import {
	type ActionSchema,
	MessageType,
	type Target,
} from "../../type/shooting";
import { TargetStatus } from "../../type/target";

const getTargetProperty = (pos: [number, number, number]): TargetProperty => {
	const target = initialTargets.find(
		(target) =>
			target.pos.x === pos[0] &&
			target.pos.y === pos[1] &&
			target.pos.z === pos[2],
	);
	return (
		target || {
			index: -1,
			pos: { x: 0, y: 0, z: 0 },
			size: { x: 0, y: 0, z: 0 },
		}
	);
};

export const YataiTarget = (props: ThreeElements["mesh"]) => {
	const { sendData } = useSocketSender();
	const { onMessage } = useSocketReceiver();

	const position = props.position as [number, number, number];
	const property = getTargetProperty(position);
	const { targetStatus, updateTargetStatus } = useTargetStatusStore(
		(state) => ({
			targetStatus: state.targetStatus,
			updateTargetStatus: state.updateTargetStatus,
		}),
	);

	//
	const size: [number, number, number] = useMemo(() => {
		return [property.size.x, property.size.y, property.size.z];
	}, [property.size]);

	const [ref, api] = useBox(() => ({
		mass: 1,
		position: position,
		args: size,
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
			targetStatus[property.index] === TargetStatus.Live &&
			target.x * 8 > position[0] - size[0] / 2 &&
			target.x * 8 < position[0] + size[0] / 2 &&
			target.y * 8 > position[1] - size[1] / 2 - 2 &&
			target.y * 8 < position[1] + size[1] / 2 - 2
		) {
			api.applyImpulse(
				[randFloat(-2, 2), 4, 8],
				[randFloat(-1, 1), randFloat(-1, 1), randFloat(-1, 1)],
			);
			updateTargetStatus(property.index, TargetStatus.Hit);
			sendData(message_type.hit, uuid, { alpha: 0, beta: 0 });
		}
	}, [
		target,
		targetStatus,
		property,
		position,
		size,
		api,
		sendData,
		updateTargetStatus,
		uuid,
	]);

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
			<boxGeometry args={[...size]} />
			<meshStandardMaterial color={"yellow"} />
		</mesh>
	);
};
