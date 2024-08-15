import styles from "./index.module.css";

function Garelly() {
	return (
		<div>
			{/* biome-ignore lint/a11y/useMediaCaption: 夏祭りの音を再生します。 */}
			<audio
				src="/sound/natsu_matsuri.mp3"
				autoPlay
				loop
				aria-label="夏祭りの音"
			/>
			<h1 className={styles.title}>VIRTUAL_NATSUMATSURI</h1>
			<div className={styles.nobori}>
				<img src="/2D_material/nobori.webp" alt="夏祭り_のぼり" />
			</div>
			<div className={styles.light}>
				<img src="/2D_material/red_small_lite.webp" alt="提灯" />
			</div>
			<div className={styles.container}>
				<div className={styles.logo}>
					<img src="/logo.webp" alt="logo" />
				</div>
				<p className={styles.shop}>VIRTUAL_NATSUMATSURI</p>
			</div>
			<div className={styles["light-right"]}>
				<img src="/2D_material/red_small_lite.webp" alt="提灯" />
			</div>
		</div>
	);
}
export default Garelly;
