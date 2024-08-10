import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
const AppRoutes = () => {
	return (
		<>
			<Routes>
				<Route path="/" />
				<Route path="/home" element={<Home />} />
			</Routes>
		</>
	);
};

export default AppRoutes;
