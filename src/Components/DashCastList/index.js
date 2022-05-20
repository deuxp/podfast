import DashCastItem from "../DashCastItem";
import Stack from "@mui/material/Stack";
import ListItem from "@mui/material/ListItem";
import Container from "@mui/material/Container";
import RecTimer from "../RecTimer";
import { useEffect } from "react";
import useStopwatch from "../../hooks/useStopwatch";

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
      {recording && <RecTimer time={time} />}
      <h3> Your Minicasts:</h3>
      <Stack>{renderItem}</Stack>
    </Container>
  );
}

export default DashCastList;
