import { useEffect, useState } from "react";
import TimerButton from "./TimerButton";
import { generateBoard } from "./DiceGenerator";

const MILLISECONDS_IN_A_SECOND = 1000;
const MAX_TIME = 60;

const BoardContainer = () => {
  const [time, setTime] = useState(0);
  const [isTiming, setIsTiming] = useState(false);
  const [board, setBoard] = useState(generateBoard());

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
      setBoard(generateBoard());
    }
  };

  const timerLabel = isTiming ? "stop" : "start";

  return (
    <div className="board-container">
      <h1>Boggle</h1>
      <h3>Current time: {time}</h3>
      <TimerButton onClick={handleTimerChange} label={timerLabel} />
      <div className="board">
        {board.map((letter, index) => (
          <div key={index} className="board-tile">
            {letter}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardContainer;
