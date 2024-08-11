import { useNavigate } from "react-router-dom";
import { useSocketRefStore } from "../../../store";
import { requestPermission } from "../../../utils/permission";
import { DefaultButton } from "../../ui/Button";
import Rule from "../../ui/Rule";
import styles from "./index.module.css";

function HomeSP() {
	const navigate = useNavigate();
	const setRef = useSocketRefStore((state) => state.setRef);

	const handleClick = () => {
		requestPermission();
		const params = new URLSearchParams(location.search);
		const roomId = params.get("room_id");
		const socketRef = new WebSocket(
			`wss://${
				import.meta.env.VITE_HOST_NAME ||
				"virtual-natsumatsuri-3jpy6th4da-an.a.run.app"
			}/ws?room_id=${roomId}`,
		);
		setRef({ current: socketRef });
		const audio = new Audio("/sound/wadaiko.mp3");
		audio
			.play()
			.then(() => {
				setTimeout(() => {}, 500);
			})
			.catch((error) => {
				console.error("オーディオの音が出なかった", error);
			});
		navigate("/shooter");
	};

	return (
		<div>
			<div className={styles.container}>
				<div className={styles["scroll-infinity"]}>
					<div className={styles["scroll-infinity__wrap"]}>
						<ul
							className={`${styles["scroll-infinity__list"]} ${styles["scroll-infinity__list--left"]}`}
						>
							<li className={styles["scroll-infinity__item"]}>
								VIRTUAL_NATSUMATSURI
							</li>
							<li className={styles["scroll-infinity__item"]}>
								VIRTUAL_NATSUMATSURI
							</li>
							<li className={styles["scroll-infinity__item"]}>
								VIRTUAL_NATSUMATSURI
							</li>
						</ul>
					</div>
				</div>
				<div className={styles["background-logo"]}>
					<img
						src="/logo.webp"
						alt="背景にばーちゃるなつまつりのロゴ"
						width="380"
						height="380"
					/>
				</div>
				<div className={styles.text}>
					<Rule />
				</div>
				<div className={styles["go-game-sp"]}>
					<DefaultButton color="red" size="md" onClick={handleClick}>
						射的へ向かう
					</DefaultButton>
				</div>
			</div>
		</div>
	);
}

export default HomeSP;
