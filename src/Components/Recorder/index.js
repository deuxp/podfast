import Box from "@mui/material/Box";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import Fab from "@mui/material/Fab";
import SettingsVoiceIcon from "@mui/icons-material/SettingsVoice";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import PausePresentationIcon from "@mui/icons-material/PausePresentation";

import TextField from "@mui/material/TextField";
import { useState } from "react";
import Button from "@mui/material/Button";

// font-family: 'Goldman', cursive; <-- the typography css rule

function Recorder() {
  const [rec, setRec] = useState(true);

  return (
    <>
      <h2>Record a mini-cast</h2>
      <Box
        sx={{
          borderRadius: "15px",
          width: "40vw",
          height: 300,
          transition: "background-color 1s, box-shadow 0.5s",
          backgroundColor: "rgba(209, 150, 255, 1)",
          "&:hover": {
            backgroundColor: "rgba(226, 166, 255, 1)",
            boxShadow: "5px 5px #383434",
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      >
        <TextField
          id="castTitle"
          label="Title"
          variant="standard"
          sx={{ padding: "0.5rem", marginTop: "0.5rem", marginLeft: "0.5rem" }}
        />
        <TextField
          id="castDescription"
          label="Description"
          variant="outlined"
          sx={{ padding: "0.5rem", marginTop: "0.5rem" }}
        />

        {!rec && (
          <Fab
            aria-label="add"
            onClick={() => console.log("the recorder has started")}
            sx={{
              backgroundColor: "rgba(0, 255, 240, 1)",
              border: "solid rgba(147, 246, 223, 1)",
            }}
          >
            <SettingsVoiceIcon sx={{ color: "red" }} />
          </Fab>
        )}

        {rec && (
          <Fab
            onClick={() => console.log("the recorder has stopped")}
            aria-label="add"
            sx={{
              backgroundColor: "rgba(0, 255, 240, 1)",
              border: "solid rgba(147, 246, 223, 1)",
            }}
          >
            <StopCircleIcon />
          </Fab>
        )}

        {
          <Fab
            onClick={() => console.log("the mp3 is playing")}
            aria-label="add"
            sx={{
              backgroundColor: "rgba(0, 255, 240, 1)",
              border: "solid rgba(147, 246, 223, 1)",
            }}
          >
            {<PlayCircleIcon />}
            {/* {!rec && <PlayCircleIcon sx={{ backgroundColor: "black" }} />} */}
          </Fab>
        }

        <Button
          onClick={() => console.log("posted the recording")}
          variant="contained"
          sx={{ backgroundColor: "rgba(0, 255, 240, 1)" }}
        >
          Post
        </Button>
      </Box>
    </>
  );
}

export default Recorder;
