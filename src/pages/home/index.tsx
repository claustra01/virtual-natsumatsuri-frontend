import styles from "./index.module.css";

function Home() {
	return (
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
	);
}

export default Home;
