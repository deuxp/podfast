import DashCastItem from "../DashCastItem";
import Stack from "@mui/material/Stack";
import ListItem from "@mui/material/ListItem";
import Container from "@mui/material/Container";

function DashCastList({ userMiniCasts, setUserMiniCasts, recording }) {
  const handleDeletedCasts = (id) => {
    const newList = userMiniCasts.filter((cast) => id !== cast.id);
    setUserMiniCasts(newList);
  };

  const renderItem = userMiniCasts.map((cast, index) => (
    <ListItem key={index}>
      <DashCastItem cast={cast} updateCasts={handleDeletedCasts} />
    </ListItem>
  ));
  return (
    <Container maxWidth="md">
      {recording && <h3>RECORDING!</h3>}
      <h3> Your Minicasts:</h3>
      <Stack>{renderItem}</Stack>
    </Container>
  );
}

export default DashCastList;
