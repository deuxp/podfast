import Minicast from "../Minicast";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

function DynamicMinicast(props) {
  let { id } = useParams();

  // I believe I should GET the one minicast of interest from the data base rather than choosing index based on route parameter and passing all the playlists

  const [minicast, setMinicast] = useState([]);

  const GET_URL = `http://localhost:8080/minicasts/${id}`;

  // get from the server
  // unfortunately have to get all minicasts as the id refers to the order in which they come from the server
  // will need to rewrite this hook to be reusable among different components
  useEffect(() => {
    axios
      .get(GET_URL)
      .then((res) => {
        setMinicast(res.data[0]);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, [GET_URL]);

  return (
    <Minicast
      key={id}
      id={id}
      title={minicast.title}
      description={minicast.description}
      audio_link={minicast.audio_link}
      banner_link={minicast.banner_link}
      avatar_link={minicast.avatar_link}
      setCurrentCast={props.onChange(minicast)}
      handle={minicast.handle}
    />
  );
}

export default DynamicMinicast;
