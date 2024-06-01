import Dice from "./Dice";

const Row = ({ letters }: { letters: string[] }) => {
  const diceArray = letters.map((letter, letterIndex) => (
    <Dice key={letterIndex} letter={letter} />
  ));

  return <div style={{ display: "flex" }}>{diceArray}</div>;
};

export default Row;
