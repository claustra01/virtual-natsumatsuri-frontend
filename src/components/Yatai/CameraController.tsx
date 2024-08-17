import { useThree } from "@react-three/fiber";

export const CameraController = () => {
	const { camera } = useThree();
	camera.position.set(0, 3, 12);
	camera.lookAt(0, 2, 0);
	return null;
};
