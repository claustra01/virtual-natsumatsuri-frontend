import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Result from "./pages/result";
import Shooter from "./pages/shooter";
import Yatai from "./pages/yatai";

const AppRoutes = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/shooter" element={<Shooter />} />
				<Route path="/yatai" element={<Yatai />} />
				<Route path="/result" element={<Result />} />
			</Routes>
		</>
	);
};

export default AppRoutes;
