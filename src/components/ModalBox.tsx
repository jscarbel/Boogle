interface ModalProps {
  onClose: (isVisible: boolean) => void;
  isVisible: boolean;
  totalScore: number;
  totalWordsFound: number;
}

export const Modal = ({
  onClose,
  isVisible,
  totalScore,
  totalWordsFound,
}: ModalProps) => {
  if (!isVisible) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <h1 className="header-text">Game Over!</h1>
        <h3>Total score: {totalScore}</h3>
        <h3>Words found: {totalWordsFound}</h3>
        <p className="modal-title">Hello Modal!</p>
        <button className="modal-close-button" onClick={() => onClose(false)}>
          close
        </button>
      </div>
    </div>
  );
};
