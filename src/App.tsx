import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Result from "./pages/result";
import Shooter from "./pages/shooter";
import Yatai from "./pages/yatai";

const AppRoutes = () => {
	const [score, setScore] = useState<number>(0);

	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/shooter" element={<Shooter setScore={setScore} />} />
			<Route path="/result" element={<Result score={score} />} />
			<Route path="/yatai" element={<Yatai />} />
		</Routes>
	);
};

export default AppRoutes;
