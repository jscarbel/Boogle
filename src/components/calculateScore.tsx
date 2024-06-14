const calculateScore = (word: string) => {
  let score = 0;
  switch (word.length) {
    case 1:
      score = 0;
      break;
    case 2:
      score = 0;
      break;
    case 3:
      score = 1;
      break;
    case 4:
      score = 1;
      break;
    case 5:
      score = 2;
      break;
    case 6:
      score = 3;
      break;
    case 7:
      score = 5;
      break;
    default:
      score = 11;
  }
  return score;
};

export default calculateScore;
