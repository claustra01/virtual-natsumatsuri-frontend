import { Physics } from "@react-three/cannon";
import { Canvas } from "@react-three/fiber";
import { memo } from "react";
import { CameraController } from "./CameraController";
import { YataiFoundation } from "./YataiFoundation";
import styles from "./YataiStage.module.css";
import { YataiTarget } from "./YataiTarget";

export const YataiStage = memo(() => {
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
					<YataiFoundation position={[0, 2, -2]} />
					<YataiFoundation position={[0, 0, 0]} />
					<YataiTarget position={[-3, 1.8, 0]} />
					<YataiTarget position={[0, 1.8, 0]} />
					<YataiTarget position={[3, 1.8, 0]} />
				</Physics>
			</Canvas>
		</div>
	);
});
