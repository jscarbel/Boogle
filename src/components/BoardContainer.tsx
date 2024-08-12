import { useEffect, useState } from "react";
import TimerButton from "./TimerButton";
import { generateBoard } from "../scripts/generateBoard";
import { DiceGrid } from "./DiceGrid";
import InputWord from "./InputWord";
import { checkIfWordIsOnBoard } from "../scripts/checkIfWordIsOnBoard";
import { MILLISECONDS_IN_A_SECOND, MAX_TIME } from "../constants";
import calculateScore from "../scripts/calculateScore";
import { Modal } from "./ModalBox";

type Scores = {
  id: number;
  createAt: string;
  userName: string;
  wordCount: number;
  score: number;
}[];

const BoardContainer = () => {
  const [time, setTime] = useState(0);
  const [isTiming, setIsTiming] = useState(false);
  const [boardLetters, setBoardLetters] = useState<string[][]>(generateBoard());
  const [wordSet, setWordSet] = useState<Set<string>>(new Set());
  const [totalScore, setTotalScore] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isLoadingScores, setIsLoadingScores] = useState<boolean>(false);

  const [scores, setScores] = useState<Scores>([]);

  const tenthHighestScore: number | undefined = scores[9]?.score;

  useEffect(() => {
    const baseUrl = process.env.REACT_APP_BACKEND_BASE_URL;
    if (typeof baseUrl !== "string") return;
    const backendUrl = `${baseUrl}/scores`;
    setIsLoadingScores(true);
    fetch(backendUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch scores.");
        }
        return response.json();
      })
      .then((parsedScores) => {
        setScores(parsedScores);
      })
      .catch((error) => {
        console.error("Error fetching scores:", error);
      })
      .finally(() => {
        setIsLoadingScores(false);
      });
  }, [isVisible]);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
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

  const handleWordSubmission = (word: string) => {
    if (wordSet.has(word)) return;

    const isWordOnBoard: boolean = checkIfWordIsOnBoard(boardLetters, word);
    if (!isWordOnBoard) return;

    wordSet.add(word);
    const currentWordScore = calculateScore(word);
    setTotalScore((prevTotalScore) => currentWordScore + prevTotalScore);
  };
  let totalWordsFound = wordSet.size;

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
        <div className="dice-container">
          <DiceGrid letters={boardLetters} />
        </div>
        <InputWord wordSet={wordSet} onWordSubmit={handleWordSubmission} />
      </div>
      <Modal
        isVisible={isVisible}
        onClose={setIsVisible}
        totalScore={totalScore}
        totalWordsFound={totalWordsFound}
        scoreToBeat={tenthHighestScore}
      />
      <p>High Scores:</p>
      {isLoadingScores
        ? "loading..."
        : scores.map((s) => (
            <div key={s.id}>
              <br />
              userName: {s.userName}
              <br />
              score: {s.score}
              <br />
              wordCount: {s.wordCount}
            </div>
          ))}
    </div>
  );
};

export default BoardContainer;
