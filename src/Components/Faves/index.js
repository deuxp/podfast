import Minicast from "../Minicast";
import axios from "axios";
import { useEffect } from "react";

function Faves({ minicasts, onChange, setPlaylist }) {
  let GET_URL = "";

  let user = true;

  const userString = localStorage.getItem("minicastUser");
  if (userString) {
    const user = JSON.parse(userString);
    GET_URL = `http://localhost:8080/users/${user.id}/minicasts/faves`;
  } else {
    user = false;
  }

  useEffect(() => {
    // don't make requests if no user!
    if (!user) {
      return;
    }

    axios
      .get(GET_URL)
      .then((res) => {
        setPlaylist(res.data);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);

  const MinicastArray = minicasts.map((minicast) => {
    return (
      <Minicast
        key={minicast.id}
        id={minicast.id}
        title={minicast.title}
        description={minicast.description}
        audio_link={minicast.audio_link}
        banner_link={minicast.banner_link}
        avatar_link={minicast.avatar_link}
        setCurrentCast={() => onChange(minicast)}
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
