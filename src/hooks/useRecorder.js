import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import app from "../fireBase-config";
import { getStorage, uploadBytes, ref, getDownloadURL } from "firebase/storage";
const MicRecorder = require("mic-recorder-to-mp3");

export function useRecorder(initialState) {
  const storage = getStorage();

  // from control
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false); // loading backdrop

  const [userMiniCasts, setUserMiniCasts] = useState([]);

  const [save, setSave] = useState(initialState);
  // alias to set banner from dropzone
  const setBanner = (banner) => {
    setSave({
      ...save,
      banner,
    });
  };

  const GET_URL = "http://localhost:8080/users/dashboard";

  const displayNewList = (item, list) => {
    const newList = [item, ...list];
    setUserMiniCasts(newList);
  };

  useEffect(() => {
    axios
      .get(GET_URL)
      .then((res) => {
        setUserMiniCasts(res.data);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, [setUserMiniCasts]);

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
    // const player = new Audio(URL.createObjectURL(save.file));
    save.playback.play();
  };

  const onPause = () => {
    console.log("pause");
    save.playback.pause();
  };

  /* ---------------------------------- POST ---------------------------------- */
  const onPost = async () => {
    setOpen(true);
    if (!save.file) throw new Error("the audio file is blank");
    console.log("+++ upload started +++");
    const minicastRef = ref(storage, `minicasts/${uuidv4()}`);
    const bannerRef = ref(storage, `imgs/${uuidv4()}`);
    let data, bannerURL, minicastURL;

    //TODO error handling with nested error handling? do errors bubble up
    try {
      const castSnap = await uploadBytes(minicastRef, save.file);
      const bannerSnap = await uploadBytes(bannerRef, save.banner);
      minicastURL = await getDownloadURL(minicastRef);
      if (save.banner) {
        bannerURL = await getDownloadURL(bannerRef);
      }
      data = { bannerURL, minicastURL };
    } catch (e) {
      console.log("something happenned when uploading", e);
    }
    const sendData = { ...data, title, description, user_id: "1" };

    axios
      .post("http://localhost:8080/minicasts/upload", sendData)
      .then((response) => {
        if (response.status !== 201) {
          throw new Error("the server was not updated");
        }
        console.log(response);
      })
      .then(() => {
        setOpen(() => false);
      })
      .then(() => {
        setTitle("");
      })
      .then(() => {
        setDescription("");
      })
      // .then(() => {
      // setUserMiniCasts(() => [sendData, ...userMiniCasts]);
      // displayNewList(sendData, userMiniCasts);
      // })
      .catch((e) => console.log("something went wrong with the server", e));
  };

  return {
    userMiniCasts,
    setUserMiniCasts,
    save,
    setSave,
    setBanner,
    title,
    setTitle,
    description,
    setDescription,
    onRecord,
    onStop,
    onPlay,
    onPause,
    onPost,
    open,
  };
}
