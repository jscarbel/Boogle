import BoardContainer from "./BoardContainer";

interface ModalProps {
  onClose: (isVisible: boolean) => void;
  isVisible: boolean;
  totalScore: number;
}

export const Modal = ({ onClose, isVisible, totalScore }: ModalProps) => {
  if (!isVisible) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <h1 className="header-text">Modal</h1>
        <h3>Total score: {totalScore}</h3>
        <p className="modal-title">Hello Modal!</p>
        <button className="modal-close-button" onClick={() => onClose(false)}>
          close
        </button>
      </div>
    </div>
  );
};
