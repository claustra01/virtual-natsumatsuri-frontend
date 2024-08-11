import GetImage from "../../components/GetImage";
import { DefaultButton } from "../../components/ui/Button";
import styles from "./index.module.css";

function Result() {
	const images = [
		"/drink/bottle0.webp",
		"/drink/bottle1.webp",
		"/drink/bottle2.webp",
		"/drink/bottle3.webp",
	];

	return (
		<div>
			<div className={styles["result-text"]}>
				<p>結果発表!</p>
			</div>
			<div className={styles["get-image-container"]}>
				<GetImage
					images={images}
					alt="ランダムに表示されるボトル画像"
					width={160}
					height={160}
				/>
			</div>
			<div className={styles["background-logo"]}>
				<img
					src="/logo.webp"
					alt="背景にばーちゃるなつまつりのロゴ"
					width="350"
					height="350"
				/>
			</div>
			<div className={styles["get-text"]}>
				<p>Bottle Get!</p>
			</div>
			<div className={styles["share-btn"]}>
				<a
					href="https://twitter.com/intent/tweet?text=Webの射的で遊んだよ.%20%23virtualnatsumatsuri%20%23炎上開発%20%23鹿児島ハッカソン"
					target="_blank"
					rel="noopener noreferrer"
				>
					<DefaultButton variant="contained" color="black" size="md">
						Xで共有する
					</DefaultButton>
				</a>
			</div>
			<div className={styles["replay-text"]}>
				<p>また遊びにきてや〜</p>
			</div>
		</div>
	);
}

export default Result;
