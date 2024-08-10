import type { ComponentPropsWithoutRef, ReactNode } from "react";
import styles from "./index.module.css";

type ButtonProps = {
	children: ReactNode;
	variant?: "contained" | "outlined";
	size?: "sm" | "md" | "lg";
	color?: "red" | "black";
} & ComponentPropsWithoutRef<"button">;

export const DefaultButton = ({
	children,
	variant = "outlined",
	size = "md",
	color = "red",
	...props
}: ButtonProps) => {
	return (
		<button
			className={styles["button-style"]}
			data-variant={variant}
			data-size={size}
			data-color={color}
			{...props}
		>
			{children}
		</button>
	);
};
