import GetImage from "../../components/GetImage";
import { DefaultButton } from "../../components/ui/Button";
import { useScoreStore } from "../../store/useScoreStore";
import styles from "./index.module.css";

const Result = () => {
	const score = useScoreStore((state) => state.score);
	const image =
		score >= 0 && score <= 3
			? `/drink/bottle${score}.webp`
			: "/drink/bottle0.webp";

	return (
		<div>
			<div className={styles["result-text"]}>
				<p>結果発表!</p>
			</div>
			<div className={styles["get-image-container"]}>
				<GetImage
					images={[image]}
					alt={`スコア ${score} に対応するボトル画像`}
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
				<p>{score}本倒した！</p>
			</div>
			<div className={styles["share-btn"]}>
				<a
					href={`https://twitter.com/intent/tweet?text=Webの射的で遊んだよ。${score}本倒した！%20%23ハックツ夏祭り`}
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
};

export default Result;
