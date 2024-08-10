import { useEffect, useState } from "react";
import { device } from "../../utils/device";
import HomePC from "../homePC/index.tsx";
import HomeSP from "../homeSP/index.tsx";

function Home() {
	const [isPcScreen, setIsPcScreen] = useState(
		window.matchMedia(device.pc).matches,
	);

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
