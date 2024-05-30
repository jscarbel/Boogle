import Row from "./Row";

const DiceGrid = ({ letters }) => {
  const diceArray = letters.map((rowOfLetters, rowIndex) => (
    <Row key={rowIndex} letters={rowOfLetters} />
  ));
  return <div>{diceArray}</div>;
};
export default DiceGrid;
