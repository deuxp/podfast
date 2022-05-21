import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { Avatar, CardActionArea, CardHeader, Grid, Box } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LinkToAvatar from "../LinkToAvatar";
import FavouriteButton from "../FavouriteButton";
import CopyToClipboardButton from "../CopyToClipboardButton";

function Minicast(props) {
  const {
    id,
    handleFaceClick,
    user_id,
    avatar_link,
    banner_link,
    description,
    title,
    handle,
    setCurrentCast,
  } = props;
  const [fave, setFave] = useState(false);

  // const [copiedText, setCopiedText] = useState("");
  // give for URL as shown in browser
  let currentURL = window.location.href;
  // need to make sure the link to be copied starts with the form http://localhost:XXXX/minicasts
  // sometimes the current url can be http://localhost:XXXX/minicasts/0 for example

  const index = currentURL.indexOf("/localhost");
  currentURL = currentURL.slice(0, index + 15) + "/minicasts";

  let linkURL = `${currentURL}/${props.id}`;

  // // copiedText needs to be reset after user copies to Clipboard, in case they wish to copy the link again from same cast
  // // added artificial delay so it does not reset right away and user can be told "Link Copied!"
  // useEffect(() => {
  //   setTimeout(() => {
  //     setCopiedText("");
  //   }, 2000);
  // }, [copiedText]);

  let POST_URL = "";
  let GET_URL = "";

  let user = true;

  const userString = localStorage.getItem("minicastUser");
  if (userString) {
    const user = JSON.parse(userString);
    POST_URL = `http://localhost:8080/users/${user.id}/faves`;
    GET_URL = `http://localhost:8080/users/${user.id}/minicasts/${props.id}/fave`;
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
      // server will return an array. The array can be empty if there was no entry of user_id or minicast_id found
      // which means the default fave state of false is appropriate (ie. the user never indicated the minicast was either favoured or not)
      .then((res) => {
        if (res.data[0]?.fave === true) {
          setFave(true);
        }
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, [user]);

  const onPost = async () => {
    const sendData = {
      minicast_id: props.id,
      fave: !fave,
    };
    axios
      .post(POST_URL, sendData)
      .then((response) => {
        if (response.status !== 201) {
          throw new Error("the server was not updated");
        }
        setFave(!fave);
      })
      .catch((e) => console.log("something went wrong with the server", e));
  };

  /* ---------------------------- CSS Declarations ---------------------------- */

  const article__item = {
    color: "gray",
  };
  const article__container = {
    backgroundImage: `url(${banner_link})`,
    borderBottom: "1px dashed #f0f3f4",
    padding: "0.5rem",
    marginBottom: "1rem",
  };

  return (
    <>
      <Grid
        container
        sx={article__container}
        // onClick={() => setCurrentCast(id)}
      >
        <Box
          sx={{
            backgroundColor: "rgba(255, 255, 255, .8)",
            borderRadius: "5px 5px 0 0",
            width: "100%",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Grid xs={1.3} pl={1.3} pt={1.3} item>
            <LinkToAvatar
              avatar_link={avatar_link}
              path={`/users/${user_id}/minicasts`}
              handleLink={() => handleFaceClick(user_id)}
            />
          </Grid>

          <Grid
            item
            xs
            container
            direction="column"
            pl={0}
            pt={1}
            onClick={() => setCurrentCast(id)}
          >
            <Box>
              <Typography variant="h5" component="div" sx={{ color: "black" }}>
                {title}
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ color: "black" }}>@{handle}</Typography>
            </Box>
          </Grid>
        </Box>

        <Box
          onClick={() => setCurrentCast(id)}
          sx={{
            minHeight: "60px",
            backgroundColor: "rgba(255, 255, 255, .8)",
            borderRadius: "0 0 5px 5px",
            width: "100%",
          }}
        >
          <Typography p={2} sx={{ color: "black" }}>
            {description}
          </Typography>
        </Box>

        <Box
          onClick={() => setCurrentCast(id)}
          p={2}
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <div style={{ opacity: "0.8" }}>
            <FavouriteButton
              user={user}
              fave={fave}
              handleClick={() => onPost()}
            />
          </div>

          <div style={{ opacity: "0.8" }}>
            <CopyToClipboardButton linkURL={linkURL} />
          </div>
        </Box>
      </Grid>
    </>
  );
}

export default Minicast;
