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

export const shuffleDice = () => {
  for (let i = DICE.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // save the values of the two references
    const firstValue = DICE[i];
    const secondValue = DICE[j];

    // swap the values
    DICE[i] = secondValue;
    DICE[j] = firstValue;
  }
};

export const getRandomLetterFromDice = (diceRow) => {
  const randomIndex = Math.floor(Math.random() * diceRow.length);
  return diceRow[randomIndex];
};

export const generateBoard = () => {
  shuffleDice();
  return DICE.map((diceRow) => getRandomLetterFromDice(diceRow));
};
