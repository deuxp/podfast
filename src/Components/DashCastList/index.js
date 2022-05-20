import DashCastItem from "../DashCastItem";
import Stack from "@mui/material/Stack";
import ListItem from "@mui/material/ListItem";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import "./DashCastList.scss";

function DashCastList({ userMiniCasts, setUserMiniCasts }) {
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
      <Typography
        variant="h5"
        sx={{ ml: 2, mt: 3, fontFamily: "'Cairo', sans-serif" }}
      >
        {" "}
        Your Minicasts:
      </Typography>
      <Stack>{renderItem}</Stack>
    </Container>
  );
}

export default DashCastList;
