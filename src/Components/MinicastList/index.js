import Minicast from "../Minicast";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CreatorShow from "../CreatorShow";

function MinicastList(props) {
  const { creatorID, setCreatorID, minicasts } = props;
  const [newCastList, setNewCastList] = useState(minicasts);

  console.log(minicasts);

  useEffect(() => {
    props.setDashboard(false);
  });

  const handleFaceClick = (creator) => {
    try {
      console.log("handled the face click");
      setCreatorID(creator);
    } catch (err) {
      console.log(err);
    }
  };

  // if a specific creator is selected, then only thier minicasts will show
  useEffect(() => {
    if (creatorID) {
      const filteredArray = newCastList?.filter(
        (cast) => cast.user_id === creatorID
      );
      setNewCastList(filteredArray);
    } else {
      setNewCastList(minicasts);
    }
  }, [creatorID, minicasts]);

  const MinicastArray = newCastList?.map((minicast, index) => {
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
        user_id={minicast.user_id}
        handleFaceClick={handleFaceClick}
        creatorID={creatorID || ""}
      />
    );
  });

  return (
    <>
      {creatorID && <CreatorShow creator={newCastList[0]} />}
      {creatorID && (
        <Box sx={{ marginLeft: "100px", padding: "2rem", position: "sticky" }}>
          <Typography variant="h4">
            @{newCastList[0]?.handle}'s Minicast Feed
          </Typography>
        </Box>
      )}
      <ul>{MinicastArray}</ul>
    </>
  );
}

export default MinicastList;
