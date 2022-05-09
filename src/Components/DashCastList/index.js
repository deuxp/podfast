import DashCastItem from "../DashCastItem";
import Stack from "@mui/material/Stack";
import ListItem from "@mui/material/ListItem";
import Paper from "@mui/material/Paper";

import Container from "@mui/material/Container";
import { useState } from "react";

const dashList = ["1", "2", "3", "4", "5"];

//TODO Bring in the data:

function DashCastList() {
  const [userMiniCasts, setUserMiniCasts] = useState([]);

  const renderItem = dashList.map((cast, index) => (
    <ListItem key={index}>
      <DashCastItem cast={cast} />
    </ListItem>
  ));
  return (
    <Container maxWidth="md">
      <h3> Your Minicasts:</h3>
      <Stack>{renderItem}</Stack>
    </Container>
  );
}

export default DashCastList;
