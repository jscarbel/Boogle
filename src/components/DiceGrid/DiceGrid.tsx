import Row from "./Row";

const DiceGrid = ({ letters }: { letters: string[][] }) => {
  const diceArray = letters.map((rowOfLetters, rowIndex) => (
    <Row key={rowIndex} letters={rowOfLetters} />
  ));
  return <div>{diceArray}</div>;
};
export default DiceGrid;
