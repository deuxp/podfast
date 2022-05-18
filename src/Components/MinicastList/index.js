import Minicast from "../Minicast";
import { useEffect } from "react";
import CreatorShow from "../CreatorShow";

function MinicastList(props) {
  useEffect(() => {
    props.setDashboard(false);
  });

  const MinicastArray = props.minicasts.map((minicast, index) => {
    return (
      <Minicast
        key={index}
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

export default MinicastList;
