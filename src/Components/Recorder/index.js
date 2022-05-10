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
import axios from "axios";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
// require("dotenv").config();
const MicRecorder = require("mic-recorder-to-mp3");

// font-family: 'Goldman', cursive; <-- the typography css rule
//TODO refactor async/await - test working
function Recorder() {
  const UPLOAD_URL = "http://localhost:8080/minicasts/upload";
  const [rec, setRec] = useState(true); // toggle views and buttons looks
  // instance of the microphone

  const [save, setSave] = useState({
    file: "",
    playback: new Audio(""), // URL.createObjectURL(file) // arg
    banner: "",
  });
  const setBanner = (banner) => {
    setSave({
      ...save,
      banner,
    });
  };

  /* -------------------------------------------------------------------------- */
  /*                                 cloudinary                                 */
  /* -------------------------------------------------------------------------- */

  const CLOUD_NAME = "dovmhs5nm";

  const cld = new Cloudinary({
    cloud: {
      cloudName: CLOUD_NAME,
    },
  });

  const myImage = cld.image("sample");

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
          //TODO replace name with uuid
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
          ...save,
          file,
          playback,
        });
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  const onPlay = () => {
    const player = new Audio(URL.createObjectURL(save.file));
    save.playback.play();
  };

  const onPause = () => {
    console.log("pause");
    save.playback.pause();
  };

  const onPost = () => {
    console.log("posted the banner to clouinary");
    console.log(save.banner);
    return new Promise((resolve, reject) => {
      // let formData = new FormData(save.file);
      const data = new FormData();
      data.append("file", save.banner);
      data.append("upload_preset", "banner");
      data.append("cloud_name", "dovmhs5nm");
      fetch(`https://apu.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: "post",
        body: data,
      })
        .then((res) => {
          console.log(res.json());
        })
        .catch((e) => e.message);
    });
  };
  // expect browser console -> status to be 204
  // expect server console ->  show the objects .. if not then parse the json

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

        <UploadBanner setBanner={setBanner} />

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
          onClick={() => onPost()}
          variant="contained"
          sx={{ backgroundColor: "rgba(0, 255, 240, 1)" }}
        >
          Post
        </Button>
      </Box>
      {/* <AdvancedImage cldImg={myImage} /> */}
    </>
  );
}

export default Recorder;
