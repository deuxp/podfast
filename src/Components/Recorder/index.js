// import MicRecorder from "mic-recorder-to-mp3";
import Box from "@mui/material/Box";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import Fab from "@mui/material/Fab";
import SettingsVoiceIcon from "@mui/icons-material/SettingsVoice";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import PausePresentationIcon from "@mui/icons-material/PausePresentation";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Button from "@mui/material/Button";
import UploadBanner from "../UploadBanner";
const MicRecorder = require("mic-recorder-to-mp3");

// font-family: 'Goldman', cursive; <-- the typography css rule

function Recorder() {
  const [rec, setRec] = useState(true); // toggle views and buttons looks
  // instance of the microphone

  const [save, setSave] = useState({
    file: "",
    playback: new Audio(""), // URL.createObjectURL(file) // arg
  });

  /* -------------------------------------------------------------------------- */
  /*                              recorder handlers                             */
  /* -------------------------------------------------------------------------- */
  const recorder = new MicRecorder({
    bitRate: 128,
  });

  const onRecord = () => {
    recorder
      .start()
      .then(() => {
        console.log("the recorder has started");
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const onStop = () => {
    recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        return new File(buffer, "ohBoy.mp3", {
          type: blob.type,
          lastModified: Date.now(),
        });
      })
      .then((file) => {
        const playback = new Audio(URL.createObjectURL(file));
        return [file, playback];
      })
      .then(([file, playback]) => {
        console.log("the recorder has stopped");
        setSave({
          file,
          playback,
        });
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  const onPlay = () => {
    console.log(save.file);
    const player = new Audio(URL.createObjectURL(save.file));
    save.playback.play();
  };

  const onPause = () => {
    console.log("pause");
    save.playback.pause();
  };

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

        <UploadBanner />

        {
          <Fab
            aria-label="add"
            onClick={() => onRecord()}
            sx={{
              backgroundColor: "rgba(0, 255, 240, 1)",
              border: "solid rgba(147, 246, 223, 1)",
            }}
          >
            <SettingsVoiceIcon sx={{ color: "red" }} />
          </Fab>
        }

        {
          <Fab
            aria-label="add"
            onClick={() => onPause()}
            sx={{
              backgroundColor: "rgba(0, 255, 240, 1)",
              border: "solid rgba(147, 246, 223, 1)",
            }}
          >
            <PausePresentationIcon />
          </Fab>
        }

        {rec && (
          <Fab
            onClick={() => onStop()}
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
            onClick={() => onPlay()}
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
