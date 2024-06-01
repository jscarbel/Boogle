export const checkIfWordIsOnBoard = (
  board: string[][],
  word: string
): boolean => {
  let isWordOnBoard = false;

  const traverseBoard = (
    rowIndex: number,
    colIndex: number,
    wordIndex: number,
    usedCoordinates: Set<string>
  ) => {
    // check if coordinate is on board
    if (rowIndex >= board.length || rowIndex < 0) return;
    if (colIndex >= board[rowIndex].length || colIndex < 0) return;

    // check if letter is in the word
    const currentLetterOnBoard = board[rowIndex][colIndex];
    const targetLetter = word[wordIndex];
    if (currentLetterOnBoard !== targetLetter) return;

    // check if we've already used the word
    const currentBoardCoordinates = `${rowIndex},${colIndex}`;
    if (usedCoordinates.has(currentBoardCoordinates)) return;

    const isWordComplete = wordIndex === word.length - 1;
    if (isWordComplete) {
      isWordOnBoard = true;
      return;
    }

    // keep track that we've visited this letter
    usedCoordinates.add(currentBoardCoordinates);
  };

  return isWordOnBoard;
};
