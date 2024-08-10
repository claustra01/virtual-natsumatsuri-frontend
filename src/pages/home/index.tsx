import { useEffect, useState } from "react";
import { DefaultButton } from "../../components/ui/Button";
import styles from "./index.module.css";

function Home() {
	const [isSmallScreen, setIsSmallScreen] = useState(
		window.matchMedia("(max-width: 600px)").matches,
	);

	useEffect(() => {
		const mediaQuery = window.matchMedia("(max-width: 600px)");

		const handleChange = (event: {
			matches: boolean | ((prevState: boolean) => boolean);
		}) => {
			setIsSmallScreen(event.matches);
		};

		mediaQuery.addEventListener("change", handleChange);

		// Cleanup event listener on component unmount
		return () => {
			mediaQuery.removeEventListener("change", handleChange);
		};
	}, []);

	const handleClick = () => {
		window.location.href = isSmallScreen ? "/shooter" : "/gallery";
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
				className={`${styles["go-game"]} ${isSmallScreen ? styles["go-game-pc"] : ""}`}
			>
				<DefaultButton color="red" size="lg" onClick={handleClick}>
					射的へ向かう
				</DefaultButton>
			</div>
		</div>
	);
}

export default Home;
