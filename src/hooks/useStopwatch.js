import { useState, useEffect } from "react";

function useStopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(true);

  useEffect(() => {
    let timer;
    if (isRunning && isPaused === false) {
      timer = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning, isPaused]);

  const handleStart = () => {
    setIsRunning(true);
    setIsPaused(false);
  };

  const handlePauseRestart = () => {
    setIsPaused(!isPaused);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  return {
    time,
    handlePauseRestart,
    handleReset,
    handleStart,
  };
}

export default useStopwatch;
