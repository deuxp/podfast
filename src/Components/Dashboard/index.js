import React from "react";
import { Container } from "@mui/material";
import Recorder from "../Recorder";
import DashCastList from "../DashCastList";

function Dashboard() {
  return (
    <Container maxWidth="sm">
      <Recorder />
      <DashCastList />
    </Container>
  );
}

export default Dashboard;
