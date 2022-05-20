import { useState, useEffect } from "react";
import axios from "axios";
import useStopwatch from "./useStopwatch";
import { UserContext } from "../App";
import { useContext } from "react";

import React from "react";

function useDashboardData() {
  const [recording, setRecording] = useState(false);

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

  return {
    recording,
    data,
    setRecording,
    user,
    usersMinicasts,
    setUserMiniCasts,
  };
}

export default useDashboardData;
