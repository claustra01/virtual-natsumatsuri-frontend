import { useEffect, useState } from "react";
import { DefaultButton } from "../../components/ui/Button";
import { device } from "../../utils/device";
import styles from "./index.module.css";

function Home() {
	const [isPcScreen, setIsPcScreen] = useState(
		window.matchMedia(device.pc).matches,
	);

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
		window.location.href = isPcScreen ? "/gallery" : "/shooter";
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
				className={`${styles["go-game"]} ${isPcScreen ? styles["go-game-pc"] : ""}`}
			>
				<DefaultButton color="red" size="lg" onClick={handleClick}>
					射的へ向かう
				</DefaultButton>
			</div>
		</div>
	);
}

export default Home;
