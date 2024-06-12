import React from "react";
import Countdown from "react-countdown";

const Completion = () => {
  return <span>Time's up!</span>;
};

const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    return;
  } else {
    return (
      <span>
        {hours}:{minutes}:{seconds}
      </span>
    );
  }
};

const CountdownTimer = ({ startTime }) => {
  const endTime = new Date(startTime).getTime() + 5 * 60 * 1000;

  return <Countdown date={endTime} renderer={renderer} />;
};

export default CountdownTimer;
