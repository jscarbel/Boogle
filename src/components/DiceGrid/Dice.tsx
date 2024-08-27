const Dice = ({
  letter,
  onDiceClick,
}: {
  letter: string;
  onDiceClick: (letter: string) => void;
}) => (
  <div
    className="dice"
    onClick={() => {
      onDiceClick(letter);
    }}
  >
    {letter}
  </div>
);
export default Dice;
