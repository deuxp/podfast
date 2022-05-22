import { Typography } from "@mui/material";

function Player({ playlist, currentCast, autoplay, setCurrentCast }) {
  const nextCast = (currentCast, playlist) => {
    // if I don't have this logic, the app crashes
    if (!currentCast) return {};
    if (!autoplay) return currentCast;
    const i = playlist.findIndex((track) => track.id === currentCast.id);
    return playlist[i + 1];
  };
  let next = nextCast(currentCast, playlist);
  console.log(currentCast);
  return (
    <div
      style={{
        backgroundImage: `url(${currentCast?.banner_link})`,
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
      <Typography
        variant="h5"
        pt={1}
        pl={1}
        sx={{ fontFamily: "'Cairo', sans-serif" }}
      >
        {currentCast ? currentCast.title : "Title"}
      </Typography>
      <Typography pl={1} pb={3}>
        @{currentCast ? currentCast.handle : "creator"}
      </Typography>
      <div style={{ backgroundColor: "#f0f3f4" }}>
        <audio
          controls
          controlsList="nodownload noplaybackrate"
          autoPlay={autoplay}
          src={currentCast?.audio_link}
          onEnded={() => setCurrentCast(next)}
        ></audio>
      </div>
    </div>
  );
}

export default Player;
