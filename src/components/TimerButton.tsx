import { MouseEventHandler } from "react";

const TimerButton = ({
  onClick,
  label,
}: {
  onClick: MouseEventHandler<HTMLButtonElement>;
  label: string;
}) => {
  return (
    <button className="button-primary" onClick={onClick}>
      {label}
    </button>
  );
};

export default TimerButton;
