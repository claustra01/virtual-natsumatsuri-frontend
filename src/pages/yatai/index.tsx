import { Canvas, type ThreeElements, useThree } from "@react-three/fiber";
import styles from "./index.module.css";
import { useState } from "react";

function Yatai() {
	// 土台
	const Foundation = (props: ThreeElements["mesh"]) => {
		return (
			<mesh {...props} castShadow receiveShadow>
				<boxGeometry args={[10, 2, 2]} />
				<meshStandardMaterial color={"red"} />
			</mesh>
		);
	};

	// 的
	const Target = (props: ThreeElements["mesh"]) => {
		// 一旦ホバーでアクションを起こす
		const [isActive, setIsActive] = useState<boolean>(false);
		return (
			<mesh {...props} castShadow receiveShadow onPointerOver={() => setIsActive(!isActive)}>
				<boxGeometry args={[0.7, 2, 0.7]} />
				<meshStandardMaterial color={isActive ? "black" : "yellow"} />
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
			</Canvas>
		</div>
	);
}

export default Yatai;
