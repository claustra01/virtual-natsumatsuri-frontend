import { Physics, useBox } from "@react-three/cannon";
import { Canvas, type ThreeElements, useThree } from "@react-three/fiber";
import type {
	BufferGeometry,
	Material,
	Mesh,
	NormalBufferAttributes,
	Object3DEventMap,
} from "three";
import { randFloat } from "three/src/math/MathUtils.js";
import styles from "./index.module.css";

function Yatai() {
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
}

export default Yatai;
