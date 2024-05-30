import Row from "./Row";

const DiceGrid = ({ letters }) => {
  const diceArray = [];
  for (let i = 0; i < letters.length; i++) {
    const letterRow = letters[i];
    const dice = <Row letters={letterRow} />;
    diceArray.push(dice);
  }
  return <div>{diceArray}</div>;
};
export default DiceGrid;
