import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "@mui/material";
import Recorder from "../Recorder";
import DashCastList from "../DashCastList";
import { useLocation } from 'react-router-dom';


function Dashboard() {
  const GET_URL_USER_MINICASTS = "http://localhost:8080/users/dashboard";
  const GET_URL_TAGS = "http://localhost:8080/minicasts/tags";
  const [data, setData] = useState({
    userMiniCasts: [],
    categories: [{ id: 999, tag: "bbq" }],
  });
  const setUserMiniCasts = (newCasts) => {
    setData((prev) => ({
      ...prev,
      userMiniCasts: newCasts,
    }));
  };

  useEffect(() => {
    Promise.all([axios.get(GET_URL_USER_MINICASTS), axios.get(GET_URL_TAGS)])
      .then((res) => {
        const [userMiniCasts, categories] = res;
        setData({
          userMiniCasts: userMiniCasts.data,
          categories: categories.data,
        });
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
      <Recorder categories={data.categories} />
      <DashCastList
        userMiniCasts={data.userMiniCasts}
        setUserMiniCasts={setUserMiniCasts}
      />
    </Container>
  );
}

export default Dashboard;
