import QRCode from "qrcode.react";

type QRCodeGeneratorProps = {
	size?: number;
	url: string;
	onUrlGenerated?: (url: string) => void;
};

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({
	size = 128,
	url,
}) => {
	return (
		<div>
			<QRCode value={url} size={size} renderAs="svg" />
		</div>
	);
};

export default QRCodeGenerator;
