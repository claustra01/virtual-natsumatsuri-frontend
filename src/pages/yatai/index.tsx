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

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		resetTargetStatus();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={styles.container}>
			<YataiStage />
			<TargetOverlay />
			<Gallery />
		</div>
	);
}

export default Yatai;
