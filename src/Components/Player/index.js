import { useState } from "react";

function Player({ play, playNextSong, helper }) {
  // const url =
  //   "https://firebasestorage.googleapis.com/v0/b/podfast-432ab.appspot.com/o/recordings%2Fdc1.mp3?alt=media&token=1ab2f7d5-ab62-4ea6-9d82-e9b12917fd74";
  // const [play, setPlay] = useState(url);

  const playsTheFirstOneOnly = (list) => {
    if (list[0]) {
      return list[0].audio_link;
    }
    return "";
  };
  const next = playsTheFirstOneOnly(play);

  return (
    <>
      <h2>title: {"title"}</h2>
      <audio controls src={next} autoPlay onEnded={playNextSong}></audio>
    </>
  );
}

export default Player;
