import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRoomIdStore, useSocketRefStore } from "../../../store";
import { copyStringToClipboard } from "../../../utils/copyClipBoard";
import { requestPermission } from "../../../utils/permission";
import QRCodeGenerator from "../../QRCodeGenerator";
import { DefaultButton } from "../../ui/Button";
import Rule from "../../ui/Rule";
import TextButton from "../../ui/TextButton";
import styles from "./index.module.css";

function HomePC() {
	const navigate = useNavigate();
	const setRef = useSocketRefStore((state) => state.setRef);
	const roomId = useRoomIdStore((state) => state.uuid);
	const url = `${window.location.href}?room_id=${roomId}`;
	const [buttonText, setButtonText] = useState("共有リンクをコピー");

	const handleCopyClick = () => {
		copyStringToClipboard(url);
		setButtonText("コピーしました");
		setTimeout(() => setButtonText("共有リンクをコピー"), 2000);
	};

	const handleClick = () => {
		requestPermission();
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
		navigate("/yatai");
	};

	return (
		<div className={styles["content-wrapper"]}>
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
			<div className={styles["left-container"]}>
				<div className={styles["background-logo"]}>
					<img src="/logo.webp" alt="背景にばーちゃるなつまつりのロゴ" />
				</div>
				<div className={styles["go-game-pc"]}>
					<DefaultButton
						variant="outlined"
						color="red"
						size="lg"
						onClick={handleClick}
					>
						射的へ向かう
					</DefaultButton>
				</div>

				<div className={styles.text}>
					<Rule />
				</div>
			</div>
			<div className={styles["right-container"]}>
				<div className={styles["yatai-wrapper"]}>
					<div className={styles["qr-wrapper"]}>
						<div className={styles["id-room"]}>
							<p>屋台のID</p>
						</div>
						<QRCodeGenerator size={512} url={url} />
					</div>
					<div className={styles["qr-scan"]}>
						<img
							src="/2D_material/scan.webp"
							alt="qr-scan"
							width="160"
							height="160"
						/>
					</div>
					<div className={styles["link-copy"]}>
						<TextButton
							text={buttonText}
							color="black"
							size="md"
							type="button"
							onClick={handleCopyClick}
							underline={true}
						/>
					</div>
				</div>
			</div>
			<div className={styles["red-lite"]}>
				<img src="/2D_material/red_lite.webp" alt="赤提灯" />
			</div>
			<div className={styles["pistol-img"]}>
				<img
					src="/2D_material/pistol.webp"
					alt="ピストル"
					width="540"
					height="540"
				/>
			</div>
		</div>
	);
}
export default HomePC;
