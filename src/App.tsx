import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Shooter from "./pages/shooter";
const AppRoutes = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/shooter" element={<Shooter />} />
			</Routes>
		</>
	);
};

export default AppRoutes;
