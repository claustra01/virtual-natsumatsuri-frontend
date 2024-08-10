import { useNavigate } from "react-router-dom";
import { useSocketRefStore } from "../../../store";
import { requestPermission } from "../../../utils/permission";
import { DefaultButton } from "../../ui/Button";
import TextButton from "../../ui/TextButton";
import styles from "./index.module.css";

function HomePC() {
	const navigate = useNavigate();
	const setRef = useSocketRefStore((state) => state.setRef);
	
	const handleClick = () => {
		requestPermission();
    const socketRef = new WebSocket(
      `wss://${import.meta.env.VITE_HOST_NAME || "virtual-natsumatsuri-3jpy6th4da-an.a.run.app"}/ws?room_id=2`
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
		navigate("/yatai");
	};

	return (
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
					width="680"
					height="680"
				/>
			</div>
			<div className={styles["go-game-pc"]}>
				<DefaultButton color="red" size="lg" onClick={handleClick}>
					射的へ向かう
				</DefaultButton>
			</div>
			<div className={styles["overlay-square"]} />
			<div className={styles["id-room"]}>
				<p>屋台のID</p>
			</div>
			<div className={styles["red-lite"]}>
				<img
					src="/2D_material/red_lite.webp"
					alt="赤提灯"
					width="500"
					height="500"
				/>
			</div>
			<div className={styles["pistol-img"]}>
				<img
					src="/2D_material/pistol.webp"
					alt="ピストル"
					width="540"
					height="540"
				/>
			</div>
			<div className={styles["qr-scan"]}>
				<img
					src="/2D_material/scan.webp"
					alt="qr-scan"
					width="200"
					height="200"
				/>
			</div>
			<div className={styles["link-copy"]}>
				<TextButton
					text="共有リンクをコピー"
					onClick={handleClick}
					underline={true}
				/>
			</div>
		</div>
	);
}
export default HomePC;
