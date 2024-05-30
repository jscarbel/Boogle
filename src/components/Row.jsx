import Dice from "./Dice";

const Row = ({ letters }) => {
  const diceArray = [];
  for (let i = 0; i < letters.length; i++) {
    const letter = letters[i];
    const dice = <Dice letter={letter} />;
    diceArray.push(dice);
  }
  return <div style={{ display: "flex" }}>{diceArray}</div>;
};
export default Row;
