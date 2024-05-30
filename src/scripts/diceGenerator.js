const DICE = [
  "AAEEGN",
  "ABBJOO",
  "ACHOPS",
  "AFFKPS",
  "AOOTTW",
  "CIMOTU",
  "DEILRX",
  "DELRVY",
  "DISTTY",
  "EEGHNW",
  "EEINSU",
  "EHRTVW",
  "EIOSST",
  "ELRTTY",
  "HIMNQU",
  "HLNNRZ",
];

const shuffleDice = () => {
  for (let currentIndex = DICE.length - 1; currentIndex > 0; currentIndex--) {
    const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
    // save the values of the two references
    const firstValue = DICE[currentIndex];
    const secondValue = DICE[randomIndex];

    // swap the values
    DICE[currentIndex] = secondValue;
    DICE[randomIndex] = firstValue;
  }
};

const getRandomLetterFromDice = (diceRow) => {
  const randomRowIndex = Math.floor(Math.random() * diceRow.length);
  return diceRow[randomRowIndex];
};

export const generateBoard = () => {
  shuffleDice();
  const board = [];
  let diceIndex = 0;

  for (let row = 0; row < 4; row++) {
    const diceRow = [];
    for (let col = 0; col < 4; col++) {
      diceRow.push(getRandomLetterFromDice(DICE[diceIndex]));
      diceIndex++;
    }
    board.push(diceRow);
  }
  return board;
};
