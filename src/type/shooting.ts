export enum MessageType {
	Pointer = "pointer",
	Action = "action",
	Hit = "hit",
}

export interface Target {
	x: number;
	y: number;
}

export interface Vector {
	x: number;
	y: number;
	z: number;
}

export interface PointerSchema {
	id: string;
	message_type: MessageType.Pointer;
	target: Target;
}

export interface ActionSchema {
	id: string;
	message_type: MessageType.Action;
	target: Target;
	vector: Vector;
}

export interface HitSchema {
	id: string;
	message_type: MessageType.Hit;
}
