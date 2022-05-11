// import MicRecorder from "mic-recorder-to-mp3";
import Box from "@mui/material/Box";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import Fab from "@mui/material/Fab";
import SettingsVoiceIcon from "@mui/icons-material/SettingsVoice";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import PausePresentationIcon from "@mui/icons-material/PausePresentation";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import UploadBanner from "../UploadBanner";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
// import { AdvancedImage } from "@cloudinary/react";
// import { Cloudinary, CloudinaryFile } from "@cloudinary/url-gen";

import { initializeApp } from "firebase/app";
import { getStorage, uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { async } from "@firebase/util";
const MicRecorder = require("mic-recorder-to-mp3");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
// Points to the root reference

//TODO refactor async/await - test working
function Recorder() {
  const storage = getStorage();
  const storageRef = ref(storage, "imgs/test_upload"); // pointer for uploading and file name

  const [imgLink, setImgLink] = useState(null);

  // const [rec, setRec] = useState(true); // toggle views and buttons looks
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
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
  /*                              recorder handlers                             */
  /* -------------------------------------------------------------------------- */
  const recorder = new MicRecorder({
    bitRate: 128,
  });

  /* --------------------------------- RECORD --------------------------------- */
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

  /* ---------------------------------- STOP ---------------------------------- */
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
        const playback = new Audio(URL.createObjectURL(file)); //TODO redundant ?
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

  /* ---------------------------------- PLAY ---------------------------------- */
  const onPlay = () => {
    const player = new Audio(URL.createObjectURL(save.file));
    save.playback.play();
  };

  const onPause = () => {
    console.log("pause");
    save.playback.pause();
  };

  // (a) path = minicasts || imgs (b)
  function postRef(path, file) {
    const resourceRef = ref(storage, `${path}/${uuidv4()}`);
    try {
      uploadBytes(resourceRef, file);
    } catch (error) {
      console.log(`didnt post to ${path}`, error);
    }
  }

  /* ---------------------------------- POST ---------------------------------- */
  const onPost = async () => {
    console.log("+++++++++++++++ upload started ++++++++++++");
    // await postRef('minicasts', save.file)
    // await postRef('imgs', save.banner)
    const castRef = ref(storage, `minicasts/${uuidv4()}`);
    const bannerRef = ref(storage, `imgs/${uuidv4()}`);
    const castSnap = await uploadBytes(castRef, save.file);
    const bannerSnap = await uploadBytes(bannerRef, save.banner);
    console.log("\t\t\tcasst snap --->", castSnap);
    getDownloadURL(bannerRef).then((url) => {
      console.log(url);
    });
    getDownloadURL(castRef).then((url) => {
      console.log(url);
    });
  };

  // const onPost = () => {
  //   console.log("+++++++++++++++ upload started ++++++++++++");
  //   //create refs
  //   const castRef = ref(storage, `minicasts/${uuidv4()}`);
  //   const bannerRef = ref(storage, `imgs/${uuidv4()}`);

  //   Promise.all([
  //     uploadBytes(castRef, save.file),
  //     uploadBytes(bannerRef, save.banner),
  //   ])
  //     .then((snapshot) => {
  //       const [castSnap, bannerSnap] = snapshot;
  //       return snapshot;
  //     })
  //     .then((snapshot) => {
  //       const [castSnap, bannerSnap] = snapshot;
  //     });
  // };

  // const onPost = () => {
  //   console.log("+++++++++++++++ banner uploaded: ", save.banner.path);
  //   // 'file' comes from the Blob or File API
  //   uploadBytes(storageRef, save.banner).then((snapshot) => {
  //     console.log("Uploaded a blob or file!");
  //     console.log("\t\t\t\t", snapshot);
  //     // take the snap shot or from here send to express
  //   });
  // };

  // set photo on page load || log file name of mp3
  useEffect(() => {
    const pathReference = ref(storage, "imgs/test_upload");
    getDownloadURL(pathReference).then((url) => {
      setImgLink(url);
    });
  }, []);

  return (
    <>
      <h2>Record a mini-cast</h2>
      <Box
        sx={{
          borderRadius: "15px",
          width: "40vw",
          height: 300,
          transition: "background-color 1s, box-shadow 0.5s",
          // backgroundColor: "rgba(209, 150, 255, 1)",
          backgroundImage: `url(${imgLink})`,
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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{
            padding: "0.5rem",
            marginTop: "0.5rem",
            marginLeft: "0.5rem",
          }}
        />
        <TextField
          id="castDescription"
          label="Description"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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

        {
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
        }

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
    </>
  );
}

export default Recorder;
