import Minicast from "../Minicast";
import { useParams } from 'react-router-dom'
import axios from 'axios';
import {useState, useEffect} from 'react';


function Faves(props) {

  const [favecasts, setFavecasts] = useState([]);

  let GET_URL = '';

  let user = true;

  const userString = localStorage.getItem("minicastUser");
  if (userString) {
    const user = JSON.parse(userString);
    GET_URL = `http://localhost:8080/users/${user.id}/minicasts/faves`
  }
  else {
    user = false;
  }
  
  useEffect(() => {
    // don't make requests if no user!
    if (!user) {
      return;
    }
  
    axios
    .get(GET_URL)
    // server will return an array. The array can be empty if there was no entry of user_id or minicast_id found
    // which means the default fave state of false is appropriate (ie. the user never indicated the minicast was either favoured or not)
    .then((res) => {
      setFavecasts(res.data)
    })
    .catch((e) => {
      console.log(e.message);
    });
  })

  let faves = [];

  for (const cast of favecasts) {
    let id = cast?.minicast_id
    const result = props.minicasts.filter(cast => cast.id == id)
    faves.push(result[0]);
  }
  

  
  const MinicastArray = faves.map((minicast, index) => {
    return (
      <Minicast
        key={minicast.id}
        id={minicast.id}
        title={minicast.title}
        description={minicast.description}
        audio_link={minicast.audio_link}
        banner_link={minicast.banner_link}
        avatar_link={minicast.avatar_link}
        setCurrentCast={() => props.onChange(minicast)}
        handle={minicast.handle}
      />
    );
  });

  return (
    <>
      <ul>{MinicastArray}</ul>
    </>
  );
}

export default Faves;

