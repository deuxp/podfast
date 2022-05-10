import DashCastItem from "../DashCastItem";
import Stack from "@mui/material/Stack";
import ListItem from "@mui/material/ListItem";
import axios from "axios";

import Container from "@mui/material/Container";
import { useState, useEffect } from "react";

// // TODO Bring in the data:

function DashCastList({ dashboard }) {
  const [userMiniCasts, setUserMiniCasts] = useState([]);
  const GET_URL = "http://localhost:8080/users/dashboard";

  useEffect(() => {
    axios
      .get(GET_URL)
      .then((res) => {
        setUserMiniCasts(res.data);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, [dashboard]);

  const renderItem = userMiniCasts.map((cast, index) => (
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
