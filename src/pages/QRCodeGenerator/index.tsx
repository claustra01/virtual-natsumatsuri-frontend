import QRCodeGenerator from "../../components/QRCodeGenerator";
import { useState } from "react";
import QRCode from "qrcode.react";

const QRCodePage: React.FC = () => {
    const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);

    const handleUrlGenerated = (generatedUrl: string) => {
        setQrCodeUrl(generatedUrl); 
    };

    return (
        <div>
            <QRCodeGenerator size={256} onUrlGenerated={handleUrlGenerated} />
            {qrCodeUrl && <QRCode value={qrCodeUrl} size={256} renderAs="svg" />}
        </div>
    );
};

export default QRCodePage;
