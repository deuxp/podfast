import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { Avatar, CardActionArea, CardHeader } from "@mui/material";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Tooltip from "@mui/material/Tooltip";
import { useState, useEffect } from "react";
import axios from "axios";

function Minicast(props) {
  const { handleFaceClick, user_id } = props;
  const [fave, setFave] = useState(false);

  const [copiedText, setCopiedText] = useState("");
  // give for URL as shown in browser
  let currentURL = window.location.href;
  // need to make sure the link to be copied starts with the form http://localhost:XXXX/minicasts
  // sometimes the current url can be http://localhost:XXXX/minicasts/0 for example

  const index = currentURL.indexOf("/localhost");
  currentURL = currentURL.slice(0, index + 15) + "/minicasts";

  let linkURL = `${currentURL}/${props.id}`;

  // copiedText needs to be reset after user copies to Clipboard, in case they wish to copy the link again from same cast
  // added artificial delay so it does not reset right away and user can be told "Link Copied!"
  useEffect(() => {
    setTimeout(() => {
      setCopiedText("");
    }, 2000);
  }, [copiedText]);

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

  return (
    <Card sx={{ maxWidth: 700, m: "1rem" }} variant="outlined">
      <CardActionArea onClick={props.setCurrentCast}>
        <CardHeader
          avatar={
            <Avatar
              src={props.avatar_link}
              onClick={() => handleFaceClick(user_id)}
              sx={{
                border: "solid #6811d8",
                zIndex: "999",
                "&:hover": { transition: "0.2s", transform: "scale(1.3)" },
              }}
            ></Avatar>
          }
          title={<Typography variant="h5">{props.title}</Typography>}
          subheader={`@${props.handle}`}
        ></CardHeader>
        <CardMedia
          component="img"
          alt="banner background"
          height="140"
          image={props.banner_link}
        />
      </CardActionArea>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between" }}>
        {user && (
          <Button size="small" onClick={() => onPost()}>
            {fave ? "Remove from Favorites" : "Add to Favorites"}
          </Button>
        )}
        {!user && <Button></Button>}
        <CopyToClipboard text={linkURL} onCopy={() => setCopiedText(linkURL)}>
          <Tooltip
            title={copiedText === linkURL ? "Link Copied!" : linkURL}
            placement="bottom"
          >
            <Button size="small">Copy Link</Button>
          </Tooltip>
        </CopyToClipboard>
      </CardActions>
    </Card>
  );
}

export default Minicast;
