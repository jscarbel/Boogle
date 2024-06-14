import { useEffect, useState } from "react";
import TimerButton from "./TimerButton";
import { generateBoard } from "../scripts/generateBoard";
import { DiceGrid } from "./DiceGrid";
import InputWord from "./InputWord";
import { checkIfWordIsOnBoard } from "../scripts/checkIfWordIsOnBoard";
import { MILLISECONDS_IN_A_SECOND, MAX_TIME } from "../constants";
import calculateScore from "./calculateScore";

const BoardContainer = () => {
  const [time, setTime] = useState(0);
  const [isTiming, setIsTiming] = useState(false);
  const [boardLetters, setBoardLetters] = useState<string[][]>(generateBoard());
  const [wordSet, setWordSet] = useState<Set<string>>(new Set());

  const handleWordAddition = (word: string) => {
    const result = checkIfWordIsOnBoard(boardLetters, word);
    console.log(result);
    setWordSet((prevWords) => new Set(prevWords.add(word)));
  };

  let timer: NodeJS.Timeout | null = null;

  useEffect(() => {
    if (isTiming) {
      timer = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime >= MAX_TIME) {
            clearInterval(timer);
            setIsTiming(false);
            return MAX_TIME;
          }
          return prevTime + 1;
        });
      }, MILLISECONDS_IN_A_SECOND);
    } else {
      clearInterval(timer);
      setTime(0);
    }
    return () => clearInterval(timer);
  }, [isTiming]);

  const handleTimerChange = () => {
    setIsTiming(!isTiming);
    if (!isTiming) {
      setBoardLetters(generateBoard());
      setWordSet(new Set());
    }
  };

  const timerLabel = isTiming ? "stop" : "start";

  return (
    <div className="board-container">
      <h1>Boggle</h1>
      <h3>Current time: {time}</h3>
      <TimerButton onClick={handleTimerChange} label={timerLabel} />
      <div className="board">
        <DiceGrid letters={boardLetters} />
        <InputWord
          wordSet={wordSet}
          onWordChange={handleWordAddition}
          onScoreChange={calculateScore}
        />
      </div>
    </div>
  );
};

export default BoardContainer;
