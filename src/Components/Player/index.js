function Player({ playlist, currentCast, autoplay, setCurrentCast }) {
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

  let next = nextCast(currentCast, playlist);

  return (
    <div style={{ position: "fixed" }}>
      <h2>{currentCast ? currentCast.title : ""}</h2>
      <audio
        controls
        autoPlay={autoplay}
        src={currentCast?.audio_link}
        onEnded={() => setCurrentCast(next)}
      ></audio>
    </div>
  );
}

export default Player;
