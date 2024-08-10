import QRCode from "qrcode.react";
import { useLocation } from "react-router-dom";
import { generateUUID } from "../utils/uuid";

type QRCodeGeneratorProps = {
	size?: number;
};

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ size = 128 }) => {
	const location = useLocation();
	const baseUrl = `${window.location.origin}${location.pathname}`;
	const roomId = generateUUID();
	const url = `${baseUrl}?room_id=${roomId}`;

	return (
		<div>
			<QRCode value={url} size={size} renderAs="svg" />
		</div>
	);
};

export default QRCodeGenerator;
