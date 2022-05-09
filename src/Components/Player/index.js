function Player({ play, playNextSong, helper }) {
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
      <audio controls src={next} onEnded={playNextSong}></audio>
    </>
  );
}

export default Player;
