import { Physics, useBox } from "@react-three/cannon";
import { Canvas, type ThreeElements, useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
import React from "react";
import type {
	BufferGeometry,
	Material,
	Mesh,
	NormalBufferAttributes,
	Object3DEventMap,
} from "three";
import { randFloat } from "three/src/math/MathUtils.js";
import { useSocketRefStore } from "../../store";
import {
	MessageType,
	type PointerSchema,
	type Target,
} from "../../type/shooting";
import styles from "./index.module.css";

const YataiStage = React.memo(() => {
	// 土台
	const Foundation = (props: ThreeElements["mesh"]) => {
		const args: [number, number, number] = [10, 2, 2];
		const [ref] = useBox(() => ({
			mass: 0,
			position: props.position as [number, number, number],
			args: args,
		}));
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
				<meshStandardMaterial color={"red"} />
			</mesh>
		);
	};

	// 的
	const Target = (props: ThreeElements["mesh"]) => {
		const args: [number, number, number] = [0.7, 2, 0.7];
		const [ref, api] = useBox(() => ({
			mass: 1,
			position: props.position as [number, number, number],
			args: args,
		}));

		// 弾が当たった時はこれを呼び出す
		const handleHit = () => {
			api.applyImpulse(
				[randFloat(-2, 2), 4, 8],
				[randFloat(-1, 1), randFloat(-1, 1), randFloat(-1, 1)],
			);
		};

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
				onPointerOver={() => handleHit()}
			>
				<boxGeometry args={[...args]} />
				<meshStandardMaterial color={"yellow"} />
			</mesh>
		);
	};

	const CameraController = () => {
		const { camera } = useThree();
		camera.position.set(0, 3, 12);
		camera.lookAt(0, 2, 0);
		return null;
	};

	return (
		<div className={styles.canvas}>
			<Canvas shadows camera={{ fov: 25 }}>
				<Physics>
					{/* 全体ライト */}
					<ambientLight intensity={Math.PI / 16} />
					{/* スポットライト */}
					<spotLight
						castShadow
						position={[4, 12, 8]}
						angle={0.5}
						penumbra={0}
						decay={0}
						intensity={Math.PI}
						shadow-mapSize-width={1024}
						shadow-mapSize-height={1024}
						shadow-bias={-0.0001}
					/>
					<CameraController />
					<Foundation position={[0, 2, -2]} />
					<Foundation position={[0, 0, 0]} />
					<Target position={[-3, 1.8, 0]} />
					<Target position={[0, 1.8, 0]} />
					<Target position={[3, 1.8, 0]} />
				</Physics>
			</Canvas>
		</div>
	);
});

const TargetOverlay = () => {
	const socketRef = useSocketRefStore((state) => state.socketRef);

	useEffect(() => {
		const onMessage = (event: MessageEvent) => {
			const data = JSON.parse(event.data);
			// サーバーから受け取ったデータを使った処理
			if (data.message_type === MessageType.Pointer) {
				aimTarget(data);
			}
			if (data.message_type === MessageType.Action) {
				// shotTarget(data);
			}
		};
		const currentSocketRef = socketRef?.current;
		currentSocketRef?.addEventListener("message", onMessage);
		return () => {
			currentSocketRef?.removeEventListener("message", onMessage);
		};
	}, [socketRef]);

	// TODO: これらは一人用,いつかマルチプレイヤー対応する
	const [aim, setAim] = useState<Target | undefined>(undefined);
	const aimTarget = (data: PointerSchema) => {
		const x = (window.innerWidth / 2) * data.target.x + window.innerWidth / 2;
		const y = (window.innerHeight / 2) * data.target.y + window.innerHeight / 2;
		setAim({ x, y });
	};

	// const [target, setTarget] = useState<Target | undefined>(undefined);
	// const shotTarget = (data: ActionSchema) => {
	// 	setTarget(data.target);
	// };

	return (
		<div
			className={styles.target}
			style={{
				left: `${aim?.x}px`,
				top: `${aim?.y}px`,
				transform: "translate(-50%, -50%)",
			}}
		>
			<img
				src="/2D_material/target.webp"
				alt="照準の表示"
				width="100%"
				height="100%"
			/>
		</div>
	);
};

function Yatai() {
	return (
		<div className={styles.container}>
			<YataiStage />
			<TargetOverlay />
		</div>
	);
}

export default Yatai;
