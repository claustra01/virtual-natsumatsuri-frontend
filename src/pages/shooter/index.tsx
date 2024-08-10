import { type KeyboardEventHandler, useState } from "react";
import { ShooterButton } from "../../components/ui/ShooterButton";
import style from "./index.module.css";

function Shooter() {
	const initialImages = [
		"/2D_material/kurk.webp",
		"/2D_material/kurk.webp",
		"/2D_material/kurk.webp",
	];

	const [images, setImages] = useState(initialImages);

	const handleClick = () => {
		setImages((prevImages) => prevImages.slice(1));
	};

	const handleKeyUp: KeyboardEventHandler<HTMLDivElement> = (event) => {
		if (event.key === "Enter" || event.key === " ") {
			handleClick();
		}
	};

	return (
		<div>
			<div className={style.trigger}>
				<ShooterButton
					onClick={handleClick}
					onKeyUp={handleKeyUp}
					onKeyDown={handleKeyUp}
					onKeyPress={handleKeyUp}
				/>
			</div>
			<div className={style.kurk}>
				{images.map((src) => (
					<img key={src} src={src} alt="コルクの残量を表示しています" />
				))}
			</div>
		</div>
	);
}

export default Shooter;
