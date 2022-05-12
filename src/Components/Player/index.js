function Player({ playlist, currentCast, autoplay, onEnded }) {

  const playsSelectedCast = (list, index) => {
    if (list[index]) {
      return list[index].audio_link;
    }
    return "";
  };

  return (
    <>
      <h2>{playlist[currentCast] ? playlist[currentCast].title : ""}</h2>
      <audio controls autoPlay={autoplay} src={playsSelectedCast(playlist, currentCast)} onEnded={onEnded} ></audio>
    </>
  );
}

export default Player;
