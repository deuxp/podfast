import React from "react";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { Avatar, CardActionArea, CardHeader } from "@mui/material";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Tooltip from "@mui/material/Tooltip"
import { useState, useEffect } from "react";


function Minicast(props) {

  const [copiedText, setCopiedText] = useState("");
  // give for URL as shown in browser
  let currentURL = window.location.href;
  // need to make sure the link to be copied starts with the form http://localhost:XXXX/minicasts
  // sometimes the current url can be http://localhost:XXXX/minicasts/0 for example
  const index = currentURL.indexOf("/minicasts")
  currentURL = currentURL.slice(0, index + 10)

  let linkURL = `${currentURL}/${props.id}`

  // copiedText needs to be reset after user copies to Clipboard, in case they wish to copy the link again from same cast
  // added artificial delay so it does not reset right away and user can be told "Link Copied!"
  useEffect(() => {
    setTimeout(() => {
      setCopiedText("")
    }, 2000)
  }, [copiedText])

  return (
    <Card
      sx={{ maxWidth: 700, m: "1rem" }}
      variant="outlined"
    >
      <CardActionArea
        onClick={props.setCurrentCast}
      >
        <CardHeader
          avatar={<Avatar src={props.avatar_link}></Avatar>}
          title={<Typography variant="h5">{props.title}</Typography>}
          subheader={props.handle}
        >
        </CardHeader>
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
        <Button size="small">Add to Favorites</Button>
        <CopyToClipboard
          text={linkURL}
          onCopy={() => setCopiedText(linkURL)}
        >
          <Tooltip
            title={
              copiedText == linkURL
                ? "Link Copied!"
                : linkURL
            }
            placement="bottom"
          >
            <Button size="small"  >Copy Link</Button>
          </Tooltip>
        </CopyToClipboard>
      </CardActions>
    </Card>
  )
}

export default Minicast;
