import { useEffect, useState } from "react";
import TimerButton from "./TimerButton";
import { generateBoard } from "../scripts/generateBoard";
import { DiceGrid } from "./DiceGrid";
import InputWord from "./InputWord";
import { checkIfWordIsOnBoard } from "../scripts/checkIfWordIsOnBoard";
import { MILLISECONDS_IN_A_SECOND, MAX_TIME } from "../constants";
import calculateScore from "../scripts/calculateScore";
import { Modal } from "./ModalBox";

const BoardContainer = () => {
  const [time, setTime] = useState(0);
  const [isTiming, setIsTiming] = useState(false);
  const [boardLetters, setBoardLetters] = useState<string[][]>(generateBoard());
  const [wordSet, setWordSet] = useState<Set<string>>(new Set());
  const [totalScore, setTotalScore] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleWordSubmission = (word: string) => {
    if (wordSet.has(word)) return;

    const isWordOnBoard: boolean = checkIfWordIsOnBoard(boardLetters, word);
    if (!isWordOnBoard) return;

    wordSet.add(word);
    const currentWordScore = calculateScore(word);
    setTotalScore((prevTotalScore) => currentWordScore + prevTotalScore);
  };
  let totalWordsFound = wordSet.size;

  let timer: NodeJS.Timeout | null = null;

  useEffect(() => {
    if (isTiming) {
      timer = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime >= MAX_TIME) {
            clearInterval(timer);
            setIsTiming(false);
            setIsVisible(true);
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
      setTotalScore(0);
      setIsVisible(false);
    }
  };

  const timerLabel = isTiming ? "stop" : "start";

  return (
    <div className="board-container">
      <h1>Boggle</h1>
      <TimerButton onClick={handleTimerChange} label={timerLabel} />
      <div className="score-time-container">
        <h3>Current time: {time}</h3>
        <h3>Current score: {totalScore}</h3>
      </div>
      <div className="board">
        <DiceGrid letters={boardLetters} />
        <InputWord wordSet={wordSet} onWordSubmit={handleWordSubmission} />
      </div>
      <Modal
        isVisible={isVisible}
        onClose={setIsVisible}
        totalScore={totalScore}
        totalWordsFound={totalWordsFound}
      />
    </div>
  );
};

export default BoardContainer;
