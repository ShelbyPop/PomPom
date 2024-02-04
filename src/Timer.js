// src/Timer.js
import React, { useState, useEffect } from 'react';

const Timer = ({ timerLength }) => {
  const [seconds, setSeconds] = useState(timerLength);

  useEffect(() => {
    setSeconds(timerLength);
  }, [timerLength]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds > 0) {
          return prevSeconds - 1;
        } else {
          clearInterval(intervalId);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timerLength]);

  // Format seconds into MM:SS
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div>
      <h2>Timer</h2>
      <p>Time remaining: {formatTime(seconds)} minutes</p>
    </div>
  );
};

export default Timer;
