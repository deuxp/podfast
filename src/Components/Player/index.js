import { Typography } from "@mui/material";

function Player({
  playlist,
  currentCast,
  autoplay,
  setCurrentCast,
  track,
  setTrack,
}) {
  const nextCast = (currentCast, playlist) => {
    // if I don't have this logic, the app crashes
    if (!currentCast) {
      return "";
    }
    // find index of currentCast given current playlist so I can choose next playlist object for next cast
    let index = 0;
    for (let i = 0; i < playlist.length; i++) {
      if (playlist[i].id === currentCast.id) {
        index = i;
      }
    }

    if (playlist[index + 1]) {
      return playlist[index + 1];
    }
  };

  console.log(currentCast);

  let next = nextCast(currentCast, playlist);

  const handleNextTrack = (index) => {
    console.log("~~~> the next track number: ", index + 1);
    console.log("~~~> autoplay is: ", autoplay);

    setTrack((track) => track + 1);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${playlist[track]?.banner_link})`,
        boxShadow: "inset 0 0 0 1000px rgba(255,255,255,.6)",
        backgroundColor: "#6811d8",
        width: "100%",
        minHeight: "100px",
        display: "flex",
        flexDirection: "column",
        borderRadius: "8px",
        border: "solid 3px #b68aed",
      }}
    >
      {/* <h2>{currentCast ? currentCast.title : ""}</h2> */}
      <Typography
        variant="h5"
        pt={1}
        pl={1}
        sx={{ fontFamily: "'Cairo', sans-serif" }}
      >
        {playlist[track] ? playlist[track]?.title : "Title"}
      </Typography>
      <Typography pl={1} pb={3}>
        @{playlist[track] ? playlist[track]?.handle : "creator"}
      </Typography>
      <div style={{ backgroundColor: "#f0f3f4" }}>
        <audio
          controls
          controlsList="nodownload noplaybackrate"
          autoPlay={autoplay}
          src={playlist[track]?.audio_link}
          // src={currentCast?.audio_link}
          onEnded={() => handleNextTrack(track)}
          // onEnded={() => setCurrentCast(next)}
        ></audio>
      </div>
    </div>
  );
}

export default Player;
