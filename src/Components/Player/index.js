function Player({ playlist, currentCast, autoplay,  setCurrentCast }) {

  const playsSelectedCast = (list, index) => {
    if (list[index]) {
      return list[index].audio_link;
    }
    return "";
  };

  const nextCast = (currentCast, playlist) => {
    // if I don't have this logic, the app crashes
    if (!currentCast) {
      return "";
    }
    // find index of currentCast given current playlist so I can choose next playlist object for next cast
    let index = 0;
    for (let i= 0; i < playlist.length; i++) {
      if (playlist[i].id === currentCast.id) {
        index = i;
      }
    }

    if (playlist[index+1]) {
      return playlist[index+1]
    }
    // if no further casts, then can repeat the last one
    else
     {return currentCast;}
  }
  
  let next = nextCast(currentCast, playlist);

  return (
    <>
      <h2>{currentCast ? currentCast.title : ""}</h2>
      <audio controls autoPlay={autoplay} src={currentCast?.audio_link} onEnded={() => setCurrentCast(next)} ></audio>
    </>
  );
}

export default Player;
