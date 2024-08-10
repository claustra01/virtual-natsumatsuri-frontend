import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DefaultButton } from "../../components/ui/Button";
import { useSocketRefStore } from "../../store";
import { device } from "../../utils/device";
import { requestPermission } from "../../utils/permission";
import HomePC from "../../components/responsive/homePC";
import HomeSP from "../../components/responsive/homeSP";
import styles from "./index.module.css";

function Home() {
	const navigate = useNavigate();

	const [isPcScreen, setIsPcScreen] = useState(
		window.matchMedia(device.pc).matches,
	);
	const setRef = useSocketRefStore((state) => state.setRef);

	useEffect(() => {
		const mediaQuery = window.matchMedia(device.pc);

		const handleChange = (event: { matches: boolean }) => {
			setIsPcScreen(event.matches);
		};

		mediaQuery.addEventListener("change", handleChange);
		return () => {
			mediaQuery.removeEventListener("change", handleChange);
		};
	}, []);

	return isPcScreen ? <HomePC /> : <HomeSP />;

}

export default Home;
