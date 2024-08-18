import { type KeyboardEventHandler, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DefaultButton } from "../../components/ui/Button";
import { Modal } from "../../components/ui/Modal";
import { ShooterButton } from "../../components/ui/ShooterButton";
import { useOrientation } from "../../hooks/useOrientation";
import { useSocketReceiver } from "../../hooks/useSocketReceiver";
import { useSocketSender } from "../../hooks/useSocketSender";
import { useUUIDStore } from "../../store";
import { useScoreStore } from "../../store/useScoreStore";
import { message_type } from "../../type/schema";
import { MessageType } from "../../type/shooting";
import style from "./index.module.css";

const Shooter = () => {
	const [isOpen, setIsOpen] = useState(true);
	const { orientationDiff } = useOrientation();
	const { sendData } = useSocketSender();
	const { onMessage } = useSocketReceiver();
	const uuid = useUUIDStore((state) => state.uuid);
	const navigate = useNavigate();
	const score = useScoreStore((state) => state.score);
	const setScore = useScoreStore((state) => state.setScore);

	const initialImages = [
		"/2D_material/cork.webp",
		"/2D_material/cork.webp",
		"/2D_material/cork.webp",
	];
	const [images, setImages] = useState(initialImages);

	useEffect(() => {
		let intervalId: number | null = null;

		intervalId = window.setInterval(() => {
			sendData(message_type.status, uuid, orientationDiff);
		}, 100);

		return () => clearInterval(intervalId);
	}, [uuid, orientationDiff, sendData]);

	useEffect(() => {
		onMessage((data) => {
			if (data.message_type === MessageType.Hit && data.id === uuid) {
				setScore((prevScore: number) => prevScore + 1);
			}
		});
	}, [onMessage, uuid, setScore]);

	useEffect(() => {
		if (images.length === 0) {
			navigate("/result", { state: { score } });
		}
	}, [images, navigate, score]);

	const handleClick = () => {
		const audio = new Audio("/sound/cork_sound.mp3");
		audio.play().catch((error) => {
			console.error("オーディオの音が出なかった", error);
		});
		sendData(message_type.action, uuid, orientationDiff);
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
				{images.length > 0 ? (
					images.map((src, i) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						<img key={i} src={src} alt="コルクの残量を表示しています" />
					))
				) : (
					<p>コルクがなくなりました!</p>
				)}
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
