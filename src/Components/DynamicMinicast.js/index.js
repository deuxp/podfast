import Minicast from "../Minicast";
import { useParams } from 'react-router-dom'


function DynamicMinicast(props) {

  const { id } = useParams();
  // I believe I should GET the one minicast of interest from the data base rather than choosing index based on route parameter and passing all the playlists
  let minicast = props.minicasts[id];

  return (
    <Minicast key={id} id={id} title={minicast.title} description={minicast.description} audio_link={minicast.audio_link} banner_link={minicast.banner_link} avatar_link={minicast.avatar_link} setCurrentCast={props.onChange(id) } handle={minicast.handle} /> 
    )
  
};

export default DynamicMinicast;
