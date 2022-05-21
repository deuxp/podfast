import React from "react";
import { Container } from "@mui/material";
import Recorder from "../Recorder";
import DashCastList from "../DashCastList";

import axios from "axios";
import { useState, useEffect } from "react";
import { UserContext } from "../../App";
import { useContext } from "react";

function Dashboard({
  recording,
  setRecording,
  setStop,
  setHidden,
}) {
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

  const user = useContext(UserContext);

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

  const usersMinicasts = (casts, session_id) => {
    return casts.filter((cast) => session_id === cast.user_id);
  };


  return (
    <>
      <Container maxWidth="sm">
        <Recorder
          categories={data.categories}
          setRecording={setRecording}
          setStop={setStop}
          setHidden={setHidden}
        />
        <DashCastList
          userMiniCasts={usersMinicasts(data.userMiniCasts, user?.id)}
          setUserMiniCasts={setUserMiniCasts}
          recording={recording}
        />
      </Container>
    </>
  );
}

export default Dashboard;
