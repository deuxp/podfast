import Minicast from "../Minicast";

function MinicastList(props) {

  const MinicastArray = props.minicasts.map( (minicast, index) => {
    return (
      <Minicast key={index} title={minicast.title} description={minicast.description} audio_link={minicast.audio_link} banner_link={minicast.banner_link} avatar_link={minicast.avatar_link}/>
    )
  })
  
  return (
    <ul>
      {MinicastArray}
    </ul>
  );
}

export default MinicastList;
