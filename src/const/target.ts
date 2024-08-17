export type TargetProperty = {
	index: number;
	pos: ThreeDim;
	size: ThreeDim;
};

export type ThreeDim = {
	x: number;
	y: number;
	z: number;
};

export const initialTargets: TargetProperty[] = [
	// 本来posはy=2だが0.1だけ埋め込むことで反動を利用したいい感じのアニメーションを出している
	{ index: 0, pos: { x: -3, y: 1.7, z: 0 }, size: { x: 0.7, y: 1.8, z: 0.7 } },
	{ index: 1, pos: { x: 0, y: 1.7, z: 0 }, size: { x: 0.7, y: 1.8, z: 0.7 } },
	{ index: 2, pos: { x: 3, y: 1.7, z: 0 }, size: { x: 0.7, y: 1.8, z: 0.7 } },
];
