import { useNavigate } from "react-router-dom";
import {
  type KeyboardEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";
import { DefaultButton } from "../../components/ui/Button";
import { Modal } from "../../components/ui/Modal";
import { ShooterButton } from "../../components/ui/ShooterButton";
import type { Orientation } from "../../hooks/useOrientation";
import { useSocketSender } from "../../hooks/useSocketSender";
import { useUUIDStore } from "../../store";
import { useScoreStore } from "../../store/useScoreStore";
import { message_type } from "../../type/schema";
import style from "./index.module.css";
import { MessageType } from "../../type/shooting";
import { useSocketReceiver } from "../../hooks/useSocketReceiver";

const Shooter = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { sendData } = useSocketSender();
  const { onMessage } = useSocketReceiver();
  const addOneScore = useScoreStore((state) => state.addOneScore);
  const navigate = useNavigate();
  const score = useScoreStore((state) => state.score);

  const initialImages = [
    "/2D_material/cork.webp",
    "/2D_material/cork.webp",
    "/2D_material/cork.webp",
  ];
  const [images, setImages] = useState(initialImages);
  const uuid = useUUIDStore((state) => state.uuid);
  //   const intervalId = useRef<number | null>(null);
  const [initialOrientation, setInitialOrientation] = useState<Orientation>({
    alpha: 0,
    beta: 0,
    gamma: 0,
  });

  const send = useCallback(
    (event: DeviceOrientationEvent, msg_type: message_type) => {
      if (!event.alpha || !event.beta || !event.gamma) {
        return;
      }
      console.log(event.alpha, event.beta, event.gamma);
      sendData(msg_type, uuid, {
        alpha: initialOrientation
          ? (event.gamma - initialOrientation.gamma) * 2
          : event.gamma,
        beta: initialOrientation
          ? event.beta - initialOrientation.beta
          : event.beta,
      });
    },
    [sendData, uuid, initialOrientation]
  );
  useEffect(() => {
    const intervalId = setInterval(() => {
      window.addEventListener(
        "deviceorientation",
        (event) => send(event, message_type.status),
        { once: true }
      );
    }, 100);

    return () => {
      if (intervalId !== null) {
        clearInterval(intervalId);
      }
    };
  }, [send]);

  useEffect(() => {
    onMessage((data) => {
      if (data.message_type === MessageType.Hit && data.id === uuid) {
        addOneScore();
      }
    });
  }, [onMessage, uuid, addOneScore]);
  useEffect(() => {
    if (images.length === 0) {
      navigate("/result", { state: { score } });
    }
  }, [images, navigate, score]);
  const handleClick = async () => {
    window.addEventListener(
      "deviceorientation",
      (event) => send(event, message_type.action),
      { once: true }
    );
    const audio = new Audio("/sound/cork_sound.mp3");
    audio
      .play()
      .then(() => {})
      .catch((error) => {
        console.error("オーディオの音が出なかった", error);
      });
    setImages((prevImages) => prevImages.slice(1));
  };

  const handleKeyUp: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      handleClick();
    }
  };

  return (
    <div>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <ModalContent
          setIsOpen={setIsOpen}
          setInitialOrientation={setInitialOrientation}
        />
      </Modal>
      <div className={style.trigger}>
        <ShooterButton onClick={handleClick} onKeyUp={handleKeyUp} />
      </div>
      <div className={style.cork}>
        {images.length > 0 ? (
          images.map((src, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <img key={i} src={src} alt="コルクの残量を表示しています" />
          ))
        ) : (
          <p>コルクがなくなりました!</p>
        )}
      </div>
    </div>
  );
};

type ModalContentProps = {
  setIsOpen: (isOpen: boolean) => void;
  setInitialOrientation: (orientation: Orientation) => void;
};

const ModalContent: React.FC<ModalContentProps> = ({
  setIsOpen,
  setInitialOrientation,
}) => {
  const handleClick = () => {
    window.addEventListener(
      "deviceorientation",
      (event) => {
        setInitialOrientation({
          alpha: event.alpha || 0,
          beta: event.beta || 0,
          gamma: event.gamma || 0,
        });
      },
      { once: true }
    );
    setIsOpen(false);
  };
  return (
    <div className={style["modal-wrapper"]}>
      <img
        src="/2D_material/modal.webp"
        alt="スマホを画面に向かって垂直におく図"
        width="100"
        height="100"
      />
      <div className={style["modal-row"]}>
        <p className={style["modal-description"]}>
          スマホを画面に向かって
          <br />
          垂直に机の上に置いてね
        </p>
      </div>
      <div className={style["modal-selection-wrapper"]}>
        <DefaultButton
          variant="outlined"
          color="red"
          size="md"
          onClick={handleClick}
        >
          置いたよ！
        </DefaultButton>
      </div>
    </div>
  );
};

export default Shooter;
