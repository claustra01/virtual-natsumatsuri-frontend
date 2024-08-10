import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Yatai from "./pages/yatai";
const AppRoutes = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/yatai" element={<Yatai />} />
			</Routes>
		</>
	);
};

export default AppRoutes;
