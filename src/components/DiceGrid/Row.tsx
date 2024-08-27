import Dice from "./Dice";

const Row = ({
  letters,
  onDiceClick,
}: {
  letters: string[];
  onDiceClick: (letter: string) => void;
}) => {
  const diceArray = letters.map((letter, letterIndex) => (
    <Dice
      key={`letter${letterIndex}`}
      letter={letter}
      onDiceClick={onDiceClick}
    />
  ));

  return <div style={{ display: "flex" }}>{diceArray}</div>;
};

export default Row;
