function Player({ play, playNextSong, currentCast, helper }) {
  const playsTheFirstOneOnly = (list) => {
    if (list[0]) {
      return list[0].audio_link;
    }
    return "";
  };
  const next = playsTheFirstOneOnly(play);

  const playsSelectedCast = (list, index) => {
    if (list[index]) {
      return list[index].audio_link;
    }
    return "";
  };

  return (
    <>
      <h2>{play[currentCast] ? play[currentCast].title : ""}</h2>
      <audio controls autoPlay src={playsSelectedCast(play, currentCast)} onEnded={playNextSong}></audio>
    </>
  );
}

export default Player;
