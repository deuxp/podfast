import React from "react";
import { useRecorder } from "../../hooks/useRecorder";

import { Container } from "@mui/material";
import Recorder from "../Recorder";
import DashCastList from "../DashCastList";

function Dashboard() {
  // const [userMiniCasts, setUserMiniCasts] = useState([]);
  // const GET_URL = "http://localhost:8080/users/dashboard";

  const defaultRecorderState = {
    file: null,
    playback: new Audio(""), // URL.createObjectURL(file) // arg
    banner: "",
  };

  const rec = useRecorder(defaultRecorderState);
  // rec.setUserMiniCasts
  // rec.userMiniCasts

  // useEffect(() => {
  //   axios
  //     .get(GET_URL)
  //     .then((res) => {
  //       setUserMiniCasts(res.data);
  //     })
  //     .catch((e) => {
  //       console.log(e.message);
  //     });
  // }, [setUserMiniCasts]);

  return (
    <Container maxWidth="sm">
      <Recorder rec={rec} />
      <DashCastList userMiniCasts={rec.userMiniCasts} />
    </Container>
  );
}

export default Dashboard;
