import Gallery from "../../components/Gallery";
import { TargetOverlay } from "../../components/Yatai/TargetOverlay";
import { YataiStage } from "../../components/Yatai/YataiStage";
import styles from "./index.module.css";

function Yatai() {
	return (
		<div className={styles.container}>
			<YataiStage />
			<TargetOverlay />
			<Gallery />
		</div>
	);
}

export default Yatai;
