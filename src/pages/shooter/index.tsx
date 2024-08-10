import { type KeyboardEventHandler, useState } from "react";
import { DefaultButton } from "../../components/ui/Button";
import { Modal } from "../../components/ui/Modal";
import { ShooterButton } from "../../components/ui/ShooterButton";
import { useOrientation } from "../../hooks/useOrientation";
import { useSocketRefStore } from "../../store";
import { type Schema, message_type } from "../../type/schema";
import style from "./index.module.css";

const Shooter = () => {
	const [isOpen, setIsOpen] = useState(true);
	const { orientationDiff } = useOrientation();
	const socketRef = useSocketRefStore((state) => state.socketRef);

	const initialImages = [
		"/2D_material/cork.webp",
		"/2D_material/cork.webp",
		"/2D_material/cork.webp",
	];

	const [images, setImages] = useState(initialImages);

	const handleClick = () => {
		const audio = new Audio("/sound/cork_sound.mp3");
		audio
			.play()
			.then(() => {})
			.catch((error) => {
				console.error("オーディオの音が出なかった", error);
			});
		const data: Schema = {
			id: "shooter",
			interval: 0,
			angle: {
				x: orientationDiff.beta,
				y: orientationDiff.gamma,
			},
			acceleration: {
				x: 0,
				y: 0,
				z: 0,
			},
			distance: {
				x: 0,
				y: 0,
				z: 0,
			},
			message_type: message_type.action,
		};
		socketRef?.current?.send(JSON.stringify(data));
		setImages((prevImages) => prevImages.slice(1));
	};

	const handleKeyUp: KeyboardEventHandler<HTMLDivElement> = (event) => {
		if (event.key === "Enter" || event.key === " ") {
			handleClick();
		}
	};

	return (
		<div>
			<Modal open={isOpen} onClose={() => setIsOpen(false)}>
				<ModalContent setIsOpen={setIsOpen} />
			</Modal>
			<div className={style.trigger}>
				<ShooterButton onClick={handleClick} onKeyUp={handleKeyUp} />
			</div>
			<div className={style.cork}>
				{images.map((src, i) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<img key={i} src={src} alt="コルクの残量を表示しています" />
				))}
			</div>
		</div>
	);
};

type ModalContentProps = {
	setIsOpen: (isOpen: boolean) => void;
};

const ModalContent: React.FC<ModalContentProps> = ({ setIsOpen }) => {
	const { reset } = useOrientation();
	return (
		<div className={style["modal-wrapper"]}>
			<img
				src="/2D_material/modal.webp"
				alt="スマホを画面に向かって垂直におく図"
				width="100"
				height="100"
			/>
			<div className={style["modal-row"]}>
				<p className={style["modal-description"]}>
					スマホを画面に向かって
					<br />
					垂直に机の上に置いてね
				</p>
			</div>
			<div className={style["modal-selection-wrapper"]}>
				<DefaultButton
					variant="outlined"
					color="red"
					size="md"
					onClick={() => {
						reset();
						setIsOpen(false);
					}}
				>
					置いたよ！
				</DefaultButton>
			</div>
		</div>
	);
};

export default Shooter;
