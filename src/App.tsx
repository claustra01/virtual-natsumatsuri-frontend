import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Result from "./pages/result";
import Shooter from "./pages/shooter";
import Yatai from "./pages/yatai";

const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/shooter" element={<Shooter />} />
			<Route path="/result" element={<Result score={0} />} />
			<Route path="/yatai" element={<Yatai />} />
		</Routes>
	);
};

export default AppRoutes;
