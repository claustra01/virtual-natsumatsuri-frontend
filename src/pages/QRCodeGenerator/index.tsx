import QRCodeGenerator from "../../components/QRCodeGenerator";

const QRCodePage: React.FC = () => {
	return (
		<div>
			<QRCodeGenerator size={256} />
		</div>
	);
};

export default QRCodePage;
