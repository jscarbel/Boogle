export const checkIfWordIsOnBoard = (
  board: string[][],
  word: string
): boolean => {
  word = word.toUpperCase();
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
    const foundCoordinates = new Set([...usedCoordinates]);
    const currentBoardCoordinates = `${rowIndex},${colIndex}`;
    if (foundCoordinates.has(currentBoardCoordinates)) return;

    if (isWordOnBoard) return;

    // yay
    const isWordComplete = wordIndex === word.length - 1;
    if (isWordComplete) {
      isWordOnBoard = true;
      return;
    }

    // keep track that we've visited this letter
    foundCoordinates.add(currentBoardCoordinates);

    wordIndex++;

    traverseBoard(rowIndex - 1, colIndex - 1, wordIndex, foundCoordinates);
    traverseBoard(rowIndex - 1, colIndex, wordIndex, foundCoordinates);
    traverseBoard(rowIndex - 1, colIndex + 1, wordIndex, foundCoordinates);
    traverseBoard(rowIndex, colIndex + 1, wordIndex, foundCoordinates);
    traverseBoard(rowIndex + 1, colIndex + 1, wordIndex, foundCoordinates);
    traverseBoard(rowIndex + 1, colIndex, wordIndex, foundCoordinates);
    traverseBoard(rowIndex + 1, colIndex - 1, wordIndex, foundCoordinates);
    traverseBoard(rowIndex, colIndex - 1, wordIndex, foundCoordinates);
  };

  board.forEach((row, rowIndex) => {
    row.forEach((_letter, letterIndex) => {
      if (isWordOnBoard) {
        return;
      }
      traverseBoard(rowIndex, letterIndex, 0, new Set());
    });
  });

  return isWordOnBoard;
};
