import { Button } from "@mui/material";
import useStopwatch from "../../hooks/useStopwatch";

function RecTimer({ time, handlePauseRestart, handleReset, handleStart }) {
  return (
    <>
      <h1>Timer</h1>
      <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
      <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
      <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
      <br />
      <Button onClick={handleStart}>start</Button>
      <Button onClick={handlePauseRestart}>pause/start</Button>
      <Button onClick={handleReset}>reset</Button>
    </>
  );
}

export default RecTimer;
