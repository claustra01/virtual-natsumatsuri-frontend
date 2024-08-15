import { useEffect, useState } from "react";
import { useSocketReceiver } from "../../hooks/useSocketReceiver";
import {
	type ActionSchema,
	MessageType,
	type Target,
} from "../../type/shooting";
import styles from "./TargetOverlay.module.css";

export const TargetOverlay = () => {
	const { onMessage } = useSocketReceiver();

	useEffect(() => {
		onMessage((data) => {
			// ここも本来はPointerSchemaになる
			if (data.message_type === MessageType.Action) {
				shotTarget(data);
			}
		});
	}, [onMessage]);

	// TODO: これらは一人用,いつかマルチプレイヤー対応する
	const [aim, setAim] = useState<Target | undefined>(undefined);
	// TODO: エイム照準の実装
	// const aimTarget = (data: PointerSchema) => {
	// 	const x = window.innerWidth * data.target.x + window.innerWidth / 2;
	// 	const y = window.innerHeight * data.target.y + window.innerHeight / 2;
	// 	setAim({ x, y });
	// };

	// const [target, setTarget] = useState<Target | undefined>(undefined);
	const shotTarget = (data: ActionSchema) => {
		const x = window.innerWidth / 2 + data.target.x * 1200;
		const y = window.innerHeight / 2 + data.target.y * 1200;
		// TODO: エイム実装ができたらここのsetAimは削除する
		setAim({ x, y });
		// setTarget({ x, y });
	};

	return (
		<div
			className={styles.target}
			style={{
				left: `${aim?.x}px`,
				top: `${aim?.y}px`,
				transform: "translate(-50%, -50%)",
			}}
		>
			<img
				src="/2D_material/target.webp"
				alt="照準の表示"
				width="100%"
				height="100%"
			/>
		</div>
	);
};
