import Minicast from "../Minicast";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CreatorShow from "../CreatorShow";

function MinicastList(props) {
  const { creatorID, setCreatorID, minicasts, setPlaylist, current } = props;
  const [newCastList, setNewCastList] = useState(minicasts);

  const handleFaceClick = (creator) => {
    try {
      console.log("handled the face click");
      setCreatorID(creator);
    } catch (err) {
      console.log("Error in handleFaceClick()", err);
    }
  };

  // if a specific creator is selected, then only thier minicasts will show
  useEffect(() => {
    if (creatorID) {
      const filteredArray = newCastList?.filter(
        (cast) => cast.user_id === creatorID
      );
      setNewCastList(filteredArray);
      setPlaylist(filteredArray);
    } else {
      setNewCastList(minicasts);
      setPlaylist(minicasts);
    }
  }, [creatorID, minicasts]);

  const MinicastArray = newCastList?.map((minicast, index) => {
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
        user_id={minicast.user_id}
        handleFaceClick={handleFaceClick}
        creatorID={creatorID || ""}
        selected={current?.id === minicast.id}
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
      <ul style={{ marginTop: 0 }}>{MinicastArray}</ul>
    </>
  );
}

export default MinicastList;
