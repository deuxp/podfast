import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "@mui/material";
import Recorder from "../Recorder";
import DashCastList from "../DashCastList";

import { useLocation } from 'react-router-dom';


function Dashboard({ setDashboard }) {
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


  const location = useLocation();
  useEffect(() => {
    //console.log(location.pathname);
    setDashboard(true);
  }, [location]);


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
