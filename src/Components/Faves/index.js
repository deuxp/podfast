import Minicast from "../Minicast";
import axios from "axios";
import { useEffect } from "react";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

function Faves({ minicasts, onChange, setPlaylist, creatorID, setCreatorID }) {
  let GET_URL = "";

  let user = true;

  const userString = localStorage.getItem("minicastUser");
  if (userString) {
    const user = JSON.parse(userString);
    GET_URL = `http://localhost:8080/users/${user.id}/minicasts/faves`;
  } else {
    user = false;
  }

  const handleFaceClick = (creator) => {
    try {
      console.log("handled the face click");
      setCreatorID(creator);
    } catch (err) {
      console.log("Error in handleFaceClick()", err);
    }
  };

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
        user_id={minicast.user_id}
        handleFaceClick={handleFaceClick}
        // add these props to faves
        creatorID={creatorID || ""}
      />
    );
  });
  return (
    <>
      {MinicastArray && <ul>{MinicastArray}</ul>}
      {MinicastArray.length === 0 && (
        <Box
          sx={{
            width: "80%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h4"
            component="div"
            href="/minicasts"
            sx={{ color: "black", fontFamily: "'Cairo', sans-serif" }}
          >
              No Favorites in queue!
          </Typography>
        </Box>
      )}
    </>
  );
}

export default Faves;
