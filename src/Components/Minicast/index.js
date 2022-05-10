import React from "react";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { Avatar, CardActionArea, CardHeader } from "@mui/material";


function Minicast(props) {

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
        alt="green iguana"
        height="140"
        image={props.banner_link}
      />
      </CardActionArea>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
      </CardContent>
      <CardActions>

        <Button size="small">Like</Button>
        <Button size="small">Share</Button>
        <Button size="small">Follow</Button>
      </CardActions>
    </Card>
  )
}

export default Minicast;
