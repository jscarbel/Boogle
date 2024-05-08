import { useEffect, useState } from "react";
import TimerButton from "./TimerButton";

const MILLISECONDS_IN_A_SECOND = 1000;
const MAX_TIME = 60;

const BoardContainer = () => {
  const [time, setTime] = useState(0);
  const [isTiming, setIsTiming] = useState(false);

  let timer = null;

  useEffect(() => {
    if (isTiming) {
      timer = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime >= MAX_TIME) {
            clearInterval(timer); // Stop the timer after 60 seconds
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

  // useEffect(() => {
  //   if (isTiming) {
  //     timer = setInterval(() => {
  //       setTime((time) => time + 1);
  //     }, MILLISECONDS_IN_A_SECOND);
  //   } else {
  //     clearInterval(timer);
  //     setTime(0);
  //   }
  //   return () => clearInterval(timer);
  // }, [isTiming]);

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
