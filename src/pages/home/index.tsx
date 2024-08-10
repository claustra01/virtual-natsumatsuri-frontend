import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DefaultButton } from "../../components/ui/Button";
import { useSocketRefStore } from "../../store";
import { device } from "../../utils/device";
import { requestPermission } from "../../utils/permission";
import styles from "./index.module.css";

function Home() {
	const navigate = useNavigate();

	const [isPcScreen, setIsPcScreen] = useState(
		window.matchMedia(device.pc).matches,
	);
	const setRef = useSocketRefStore((state) => state.setRef);

	useEffect(() => {
		const mediaQuery = window.matchMedia(device.pc);

		const handleChange = (event: {
			matches: boolean | ((prevState: boolean) => boolean);
		}) => {
			setIsPcScreen(event.matches);
		};

		mediaQuery.addEventListener("change", handleChange);
		return () => {
			mediaQuery.removeEventListener("change", handleChange);
		};
	}, []);

	const handleClick = () => {
		const audio = new Audio("/sound/wadaiko.mp3");
		audio
			.play()
			.then(() => {
				setTimeout(() => {
					isPcScreen ? navigate("/yatai") : navigate("/shooter");
				}, 500);
			})
			.catch((error) => {
				console.error("オーディオの音が出なかった", error);
				isPcScreen ? navigate("/yatai") : navigate("/shooter");
			});
		requestPermission();
		console.log(import.meta.env.VITE_HOST_NAME);
		const socketRef = new WebSocket(
			`ws://${import.meta.env.VITE_HOST_NAME}/ws?room_id=1`,
		);
		setRef({ current: socketRef });
		isPcScreen ? navigate("/yatai") : navigate("/shooter");
	};

	return (
		<div>
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
					width="350"
					height="350"
				/>
			</div>
			<div
				className={`${styles["go-game"]} ${
					isPcScreen ? styles["go-game-pc"] : ""
				}`}
			>
				<DefaultButton color="red" size="lg" onClick={handleClick}>
					射的へ向かう
				</DefaultButton>
			</div>
		</div>
	);
}

export default Home;
