export interface Schema {
	id: string;
	interval: number;
	angle: angle;
	acceleration: acceleration;
	distance: distance;
	message_type: message_type;
	event_type: event_type;
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
	status = "status",
	action = "action",
}

export enum event_type {
	shooter = "shooter",
	ringToss = "ring_toss",
	fireFlower = "fire_flower",
}
