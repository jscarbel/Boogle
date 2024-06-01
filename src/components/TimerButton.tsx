import { MouseEventHandler } from "react";

const TimerButton = ({
  onClick,
  label,
}: {
  onClick: MouseEventHandler<HTMLButtonElement>;
  label: string;
}) => {
  return <button onClick={onClick}>{label}</button>;
};

export default TimerButton;
