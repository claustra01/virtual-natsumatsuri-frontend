import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { generateUUID } from "../utils/uuid";
import QRCode from "qrcode.react";

type QRCodeGeneratorProps = {
    size?: number;
    onUrlGenerated?: (url: string) => void;
};

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ size = 128, onUrlGenerated }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [url, setUrl] = useState<string>("");

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const existingRoomId = params.get("room_id");

        if (!existingRoomId) {
            const newRoomId = generateUUID();
            const newUrl = `${window.location.pathname}?room_id=${newRoomId}`;
            setUrl(newUrl);
            onUrlGenerated?.(newUrl);

            if (window.location.href !== newUrl) {
                navigate(newUrl, { replace: true });
            }
        } else {
            const newUrl = `${window.location.pathname}?room_id=${existingRoomId}`;
            setUrl(newUrl);
            onUrlGenerated?.(newUrl);
        }
    }, [location.search, navigate, onUrlGenerated]);

    return (
        <div>
            <QRCode value={url} size={size} renderAs="svg" />
        </div>
    );
};

export default QRCodeGenerator;
