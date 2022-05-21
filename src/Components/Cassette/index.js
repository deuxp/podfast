import { useEffect } from "react";
import RecTimer from "../RecTimer";
import useStopwatch from "../../hooks/useStopwatch";

function Cassette({ recording, stop }) {
  const { time, handleStart, handlePauseRestart, handleReset } = useStopwatch();
  useEffect(() => {
    if (recording) {
      handleReset();
      handleStart();
    }
    if (!recording && stop) {
      handlePauseRestart();
    }
  }, [recording, stop]);

  return (
    <>
      <RecTimer time={time} />
    </>
  );
}

export default Cassette;
