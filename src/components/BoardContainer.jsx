import { useEffect, useState } from "react";
import TimerButton from "./TimerButton";
import { generateBoard } from "../scripts/diceGenerator";
import { DiceGrid } from "./DiceGrid";
import InputWord from "./InputWord";

const MILLISECONDS_IN_A_SECOND = 1000;
const MAX_TIME = 60;

const BoardContainer = () => {
  const [time, setTime] = useState(0);
  const [isTiming, setIsTiming] = useState(false);
  const [boardLetters, setBoardLetters] = useState(generateBoard());

  let timer = null;

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
      </div>
      <InputWord />
    </div>
  );
};

export default BoardContainer;
