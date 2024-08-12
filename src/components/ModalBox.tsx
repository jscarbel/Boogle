import { Form } from "./Form";
interface ModalProps {
  onClose: (isVisible: boolean) => void;
  isVisible: boolean;
  totalScore: number;
  totalWordsFound: number;
  scoreToBeat: number | undefined;
}

export const Modal = ({
  onClose,
  isVisible,
  totalScore,
  totalWordsFound,
  scoreToBeat,
}: ModalProps) => {
  if (!isVisible) return null;
  const isHighScore = scoreToBeat === undefined || totalScore > scoreToBeat;

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <h1 className="header-text">Game Over!</h1>
        <div className="modal-content">
          {isHighScore && (
            <Form
              totalScore={totalScore}
              wordCount={totalWordsFound}
              onFormSubmit={() => onClose(false)}
            />
          )}
          <h3>Total score: {totalScore}</h3>
          <h3>Words found: {totalWordsFound}</h3>
        </div>
        <p className="modal-title">Well Done!</p>
        <button className="modal-close-button" onClick={() => onClose(false)}>
          close
        </button>
      </div>
    </div>
  );
};
