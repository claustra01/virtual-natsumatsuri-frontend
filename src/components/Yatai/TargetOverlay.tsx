import { useEffect, useState } from "react";
import { useSocketReceiver } from "../../hooks/useSocketReceiver";
import type { ActionSchema, PointerSchema, Target } from "../../type/shooting";
import { MessageType } from "../../type/shooting";
import styles from "./TargetOverlay.module.css";

export const TargetOverlay = () => {
	const { onMessage } = useSocketReceiver();

	useEffect(() => {
		onMessage((data) => {
			if (data.message_type === MessageType.Action) {
				shotTarget(data);
			}
			if (data.message_type === MessageType.Pointer) {
				aimTarget(data);
			}
		});
	}, [onMessage]);

	// TODO: これらは一人用,いつかマルチプレイヤー対応する
	const [aim, setAim] = useState<Target | undefined>(undefined);
	const aimTarget = (data: PointerSchema) => {
		const x = window.innerWidth / 2 + data.target.x * 1200;
		const y = window.innerHeight / 2 + data.target.y * 1200;
		setAim({ x, y });
	};

	const shotTarget = (data: ActionSchema) => {
		const x = window.innerWidth / 2 + data.target.x * 1200;
		const y = window.innerHeight / 2 + data.target.y * 1200;
		setAim({ x, y });
	};

	return (
		<div
			className={styles.target}
			style={{
				left: `${aim?.x}px`,
				top: `${aim?.y}px`,
			}}
		>
			<img
				src="/2D_material/target.webp"
				alt="照準の表示"
				className={styles.image}
			/>
		</div>
	);
};
