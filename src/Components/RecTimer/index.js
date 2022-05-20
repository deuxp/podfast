import { Button } from "@mui/material";
import useStopwatch from "../../hooks/useStopwatch";
import "./RecTimer.scss";

function RecTimer({ time, handlePauseRestart, handleReset, handleStart }) {
  return (
    <>
      <span className="time-display">
        {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
      </span>
      <span className="time-display">
        {("0" + Math.floor((time / 1000) % 60)).slice(-2)}:
      </span>
      <span className="time-display">
        {("0" + ((time / 10) % 100)).slice(-2)}
      </span>
    </>
  );
}

export default RecTimer;
