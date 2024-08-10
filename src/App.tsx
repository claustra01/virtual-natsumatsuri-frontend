import { Route, Routes } from "react-router-dom";
import QRCodePage from "./pages/QRCodeGenerator";
import Home from "./pages/home";
import Shooter from "./pages/shooter";
import Yatai from "./pages/yatai";

const AppRoutes = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/shooter" element={<Shooter />} />
				<Route path="/yatai" element={<Yatai />} />
				<Route path="/qrcode" element={<QRCodePage />} />
			</Routes>
		</>
	);
};

export default AppRoutes;
