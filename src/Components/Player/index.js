import { useState } from "react";

function Player({ _url, title }) {
  const url =
    "https://firebasestorage.googleapis.com/v0/b/podfast-432ab.appspot.com/o/recordings%2Fdc1.mp3?alt=media&token=1ab2f7d5-ab62-4ea6-9d82-e9b12917fd74";
  const [play, setPlay] = useState(url);

  return (
    <>
      <h2>title: {title}</h2>
      <audio
        controls
        src={play}
        autoPlay
        onEnded={() => console.log("the song has ended")}
      ></audio>
    </>
  );
}

export default Player;
