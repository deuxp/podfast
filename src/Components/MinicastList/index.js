import Minicast from "../Minicast";

import { useLocation } from 'react-router-dom';
import { useEffect } from "react";
import { useParams } from 'react-router-dom'


function MinicastList(props) {

  const location = useLocation();
  useEffect(() => {
    console.log(location.pathname);
    props.setDashboard(false);
  }, [location]);


  const MinicastArray = props.minicasts.map((minicast, index) => {

    return (
      <Minicast key={index} title={minicast.title} description={minicast.description} audio_link={minicast.audio_link} banner_link={minicast.banner_link} avatar_link={minicast.avatar_link} setCurrentCast={() => props.onChange(index) } handle={minicast.handle} />
    )
  })

  return (
    <ul>
      {MinicastArray}
    </ul>
  );
}

export default MinicastList;
