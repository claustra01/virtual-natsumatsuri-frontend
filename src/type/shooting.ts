export enum EventType {
	Pointer = "pointer",
	Action = "action",
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
	event_type: EventType.Pointer;
	target: Target;
}

export interface ActionSchema {
	id: string;
	event_type: EventType.Action;
	target: Target;
	vector: Vector;
}
