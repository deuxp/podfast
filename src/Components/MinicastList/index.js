import Minicast from "../Minicast";

function MinicastList(props) {

  const MinicastArray = props.minicasts.map(minicast => {
    return (
      <Minicast key={minicast.user_id} title={minicast.title} description={minicast.description} audio_link={minicast.audio_link} banner_link={minicast.banner_link} />
    )
  })
  
  return (
    <ul>
      {MinicastArray}
    </ul>
  );
}

export default MinicastList;
