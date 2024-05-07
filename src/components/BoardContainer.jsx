import { useEffect, useState } from "react";
import TimerButton from "./TimerButton";

const BoardContainer = () => {
  const [time, setTime] = useState(0);
  const [isTiming, setIsTiming] = useState(false);

  let timer = null;

  useEffect(() => {
    if (isTiming) {
      timer = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    } else {
      clearInterval(timer);
      setTime(0);
    }
    return () => clearInterval(timer);
  }, [isTiming]);

  const handleTimerChange = () => setIsTiming(!isTiming);

  const timerLabel = isTiming ? "stop" : "start";

  return (
    <div className="board-container">
      <h1>Boggle</h1>
      <h3>Current time: {time}</h3>
      <TimerButton onClick={handleTimerChange} label={timerLabel} />
    </div>
  );
};

export default BoardContainer;
