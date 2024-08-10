import styles from "./index.module.css";

type TextButtonProps = {
	text: string;
	onClick?: () => void;
	color?: string;
	size?: "sm" | "md" | "lg";
	disabled?: boolean;
	type?: "button" | "submit" | "reset";
	underline?: boolean;
};

const TextButton: React.FC<TextButtonProps> = ({
	text,
	onClick,
	color = "black",
	size = "md",
	disabled = false,
	type = "button",
	underline = false,
}) => {
	return (
		<button
			className={`${styles.textButton} ${styles[size]} ${underline ? styles.underline : ""}`}
			onClick={onClick}
			style={{ color }}
			disabled={disabled}
			type={type}
		>
			{text}
		</button>
	);
};

export default TextButton;
