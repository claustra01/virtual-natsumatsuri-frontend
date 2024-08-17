import { type KeyboardEventHandler, useEffect, useState } from "react";
import { DefaultButton } from "../../components/ui/Button";
import { Modal } from "../../components/ui/Modal";
import { ShooterButton } from "../../components/ui/ShooterButton";
import style from "./index.module.css";

type ShooterProps = {
  setScore: (score: number) => void;
};

const Shooter = ({ setScore }: ShooterProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [score, setLocalScore] = useState<number>(0);

  const initialImages = [
    "/2D_material/cork.webp",
    "/2D_material/cork.webp",
    "/2D_material/cork.webp",
  ];
  const [images, setImages] = useState(initialImages);

  // Update score only when it changes
  useEffect(() => {
    setScore(score);
  }, [score, setScore]);

  const handleClick = () => {
    const audio = new Audio("/sound/cork_sound.mp3");
    audio.play().catch((error) => {
      console.error("オーディオの音が出なかった", error);
    });

    setImages((prevImages) => {
      if (prevImages.length > 0) {
        return prevImages.slice(1);
      }
      return prevImages;
    });

    setLocalScore((prevScore) => {
      const newScore = prevScore + 1; // Increment score or adjust as needed
      return newScore;
    });
  };

  const handleKeyUp: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      handleClick();
    }
  };

  return (
    <div>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <ModalContent setIsOpen={setIsOpen} />
      </Modal>
      <div className={style.trigger}>
        <ShooterButton onClick={handleClick} onKeyUp={handleKeyUp} />
      </div>
      <div className={style.cork}>
        {images.length > 0 ? (
          images.map((src) => (
            <img key={src} src={src} alt="コルクの残量を表示しています" />
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
};

const ModalContent: React.FC<ModalContentProps> = ({ setIsOpen }) => {
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
          onClick={() => setIsOpen(false)}
        >
          置いたよ！
        </DefaultButton>
      </div>
    </div>
  );
};

export default Shooter;
