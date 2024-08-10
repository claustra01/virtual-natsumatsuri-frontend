import type { KeyboardEventHandler, MouseEventHandler } from "react";
import styles from "./index.module.css";

interface ShooterButtonProps {
	onClick?: MouseEventHandler<HTMLDivElement>;
	onKeyUp?: KeyboardEventHandler<HTMLDivElement>;
	onKeyDown?: KeyboardEventHandler<HTMLDivElement>;
	onKeyPress?: KeyboardEventHandler<HTMLDivElement>;
}

export const ShooterButton = ({
	onClick,
	onKeyUp,
	onKeyDown,
	onKeyPress,
}: ShooterButtonProps) => {
	return (
		<div
			className={styles.box}
			onClick={onClick}
			onKeyUp={onKeyUp}
			onKeyDown={onKeyDown}
			onKeyPress={onKeyPress}
			tabIndex={0}
			role="button"
			aria-label="Shoot"
		>
			<img
				src="/logo.webp"
				alt="ボタンの背景にロゴを表示させる"
				width="100"
				height="100"
			/>
			shoot
		</div>
	);
};
