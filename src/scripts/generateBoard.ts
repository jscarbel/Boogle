import { DICE_POSSIBILITIES } from "../constants";

const shuffleDice = (): void => {
  for (
    let currentIndex = DICE_POSSIBILITIES.length - 1;
    currentIndex > 0;
    currentIndex--
  ) {
    const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
    // save the values of the two references
    const firstValue = DICE_POSSIBILITIES[currentIndex];
    const secondValue = DICE_POSSIBILITIES[randomIndex];

    // swap the values
    DICE_POSSIBILITIES[currentIndex] = secondValue;
    DICE_POSSIBILITIES[randomIndex] = firstValue;
  }
};

const getRandomLetterFromDice = (diceRow: string) => {
  const randomRowIndex = Math.floor(Math.random() * diceRow.length);
  return diceRow[randomRowIndex];
};

export const generateBoard = (): string[][] => {
  shuffleDice();
  const board: string[][] = [];
  let diceIndex = 0;

  for (let row = 0; row < 4; row++) {
    const diceRow: string[] = [];
    for (let col = 0; col < 4; col++) {
      diceRow.push(getRandomLetterFromDice(DICE_POSSIBILITIES[diceIndex]));
      diceIndex++;
    }
    board.push(diceRow);
  }
  return board;
};
