function Player({ play, playNextSong }) {
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
