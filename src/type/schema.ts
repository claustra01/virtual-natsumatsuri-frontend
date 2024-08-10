export interface Schema {
	id: string;
	interval: number;
	angle: angle;
	acceleration: acceleration;
	distance: distance;
	message_type: message_type;
}

interface angle {
	x: number;
	y: number;
}

interface acceleration {
	x: number;
	y: number;
	z: number;
}

interface distance {
	x: number;
	y: number;
	z: number;
}

export enum message_type {
	pointer = "pointer",
	action = "action",
}
