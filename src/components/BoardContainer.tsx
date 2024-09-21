import { useEffect, useState, useCallback } from "react";
import TimerButton from "./TimerButton";
import { generateBoard } from "../scripts/generateBoard";
import { DiceGrid } from "./DiceGrid";
import InputWord from "./InputWord";
import { checkIfWordIsOnBoard } from "../scripts/checkIfWordIsOnBoard";
import {
  MILLISECONDS_IN_A_SECOND,
  MAX_TIME,
  INITIAL_BOARD,
} from "../constants";
import calculateScore from "../scripts/calculateScore";
import { Modal } from "./ModalBox";
import { HighScoresContainer } from "./HighScoresContainer";

export type Scores = {
  id: number;
  createAt: string;
  userName: string;
  wordCount: number;
  score: number;
}[];

const BoardContainer = () => {
  const [time, setTime] = useState(0);
  const [isTiming, setIsTiming] = useState(false);
  const [boardLetters, setBoardLetters] = useState<string[][]>(INITIAL_BOARD);
  const [wordSet, setWordSet] = useState<Set<string>>(new Set());
  const [totalScore, setTotalScore] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isLoadingScores, setIsLoadingScores] = useState<boolean>(false);
  const [scores, setScores] = useState<Scores>([]);
  const [currentWord, setCurrentWord] = useState<string>("");

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
            handleTimerStop();
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

  const handleTimerStop = useCallback(() => {
    setIsTiming(false);
    setIsVisible(true);
    setBoardLetters(INITIAL_BOARD);
  }, []);

  const handleTimerChange = () => {
    setIsTiming(!isTiming);
    if (!isTiming) {
      setBoardLetters(generateBoard());
      setWordSet(new Set());
      setTotalScore(0);
      setIsVisible(false);
      setCurrentWord("");
    } else {
      setBoardLetters(INITIAL_BOARD);
    }
  };

  const handleDiceClick = (letter: string) => {
    if (letter === "?") return;

    setCurrentWord((word) => `${word}${letter.toLowerCase()}`);
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
          <DiceGrid letters={boardLetters} onDiceClick={handleDiceClick} />
        </div>
        <InputWord
          wordSet={wordSet}
          onWordSubmit={handleWordSubmission}
          currentWord={currentWord}
          setCurrentWord={setCurrentWord}
        />
      </div>
      <Modal
        isVisible={isVisible}
        onClose={setIsVisible}
        totalScore={totalScore}
        totalWordsFound={totalWordsFound}
        scoreToBeat={tenthHighestScore}
      />
      {isLoadingScores ? (
        "loading high scores..."
      ) : (
        <HighScoresContainer scores={scores} />
      )}
    </div>
  );
};

export default BoardContainer;
