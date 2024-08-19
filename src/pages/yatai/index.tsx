import { useEffect } from "react";
import Gallery from "../../components/Gallery";
import { TargetOverlay } from "../../components/Yatai/TargetOverlay";
import { YataiStage } from "../../components/Yatai/YataiStage";
import { useTargetStatusStore } from "../../store";
import styles from "./index.module.css";

function Yatai() {
	const resetTargetStatus = useTargetStatusStore(
		(state) => state.resetTargetStatus,
	);

	// init target status
	useEffect(() => {
		resetTargetStatus();
	}, [resetTargetStatus]);

	return (
		<div className={styles.container}>
			<YataiStage />
			<TargetOverlay />
			<Gallery />
		</div>
	);
}

export default Yatai;
