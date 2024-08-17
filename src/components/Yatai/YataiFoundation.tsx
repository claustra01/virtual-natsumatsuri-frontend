import { useBox } from "@react-three/cannon";
import type { ThreeElements } from "@react-three/fiber";
import type {
	BufferGeometry,
	Material,
	Mesh,
	NormalBufferAttributes,
	Object3DEventMap,
} from "three";

export const YataiFoundation = (props: ThreeElements["mesh"]) => {
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
