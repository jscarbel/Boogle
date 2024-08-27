import Row from "./Row";

const DiceGrid = ({
  letters,
  onDiceClick,
}: {
  letters: string[][];
  onDiceClick: (letter: string) => void;
}) => {
  const diceArray = letters.map((rowOfLetters, rowIndex) => (
    <Row
      key={`row${rowIndex}`}
      letters={rowOfLetters}
      onDiceClick={onDiceClick}
    />
  ));
  return <div>{diceArray}</div>;
};
export default DiceGrid;
