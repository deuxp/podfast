import DashCastItem from "../DashCastItem";
import Stack from "@mui/material/Stack";
import ListItem from "@mui/material/ListItem";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import RecTimer from "../RecTimer";
import { useEffect } from "react";
import useStopwatch from "../../hooks/useStopwatch";
import "./DashCastList.scss";

function DashCastList({
  userMiniCasts,
  setUserMiniCasts,
  recording,
  stop,
  setStop,
}) {
  const { time, handleStart, handlePauseRestart, handleReset } = useStopwatch();

  const handleDeletedCasts = (id) => {
    const newList = userMiniCasts.filter((cast) => id !== cast.id);
    setUserMiniCasts(newList);
  };

  const renderItem = userMiniCasts.map((cast, index) => (
    <ListItem key={index}>
      <DashCastItem cast={cast} updateCasts={handleDeletedCasts} />
    </ListItem>
  ));

  useEffect(() => {
    if (recording) {
      handleStart();
    }
    if (!recording && stop) {
      handleReset();
      setStop(false);
    }
  }, [recording, stop]);

  return (
    <Container maxWidth="md">
      <div className="rec-timer">{<RecTimer time={time} />}</div>
      {/* <div>{recording && <RecTimer time={time} />}</div> */}
      <Typography variant="h5" sx={{ ml: 2, mt: 3 }}>
        {" "}
        Your Minicasts:
      </Typography>
      <Stack>{renderItem}</Stack>
    </Container>
  );
}

export default DashCastList;
