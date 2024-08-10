import { DefaultButton } from "../../ui/Button";
import styles from "./index.module.css";

function HomeSP() {
	const handleClick = () => {
		const audio = new Audio("/sound/wadaiko.mp3");
		audio
			.play()
			.then(() => {
				setTimeout(() => {
					window.location.href = "/shooter";
				}, 500);
			})
			.catch((error) => {
				console.error("オーディオの音が出なかった", error);
				window.location.href = "/shooter";
			});
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
				<div className={styles["go-game-sp"]}>
					<DefaultButton color="red" size="lg" onClick={handleClick}>
						射的へ向かう
					</DefaultButton>
				</div>
			</div>
		</div>
	);
}

export default HomeSP;
