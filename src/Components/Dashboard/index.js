import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "@mui/material";
import Recorder from "../Recorder";
import DashCastList from "../DashCastList";

function Dashboard() {
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
  }, []);

  return (
    <Container maxWidth="sm">
      <Recorder />
      <DashCastList
        userMiniCasts={userMiniCasts}
        setUserMiniCasts={setUserMiniCasts}
      />
    </Container>
  );
}

export default Dashboard;
