import React from "react";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { Avatar } from "@mui/material";

import BackgroundImg from '../../assets/raindrop_bckgrnd.jpg'

const data = {
  title: 'Loren Ipsum is The Title',
  user_handle: "WhiteWalker",
  num_of_view: 1000,
  description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum...",
  active: true,
  transcription: "",
  minicast_url: "",
  banner_url: "../../assets/raindrop_bckgrnd.jpg"
}

function Minicast(props) {
  return (
    <Card sx={{ maxWidth: 550}}>
    <CardMedia
      component="img"
      alt="green iguana"
      height="140"
      image= { BackgroundImg } 
    />
    <CardContent>
      <Typography variant="body2" color="text.secondary">
        {props.description}
      </Typography>
    </CardContent>
    <CardActions>
     <Avatar>A</Avatar>
      <div style = {{ width: "400px" }}> 
        {props.title}
      </div>
      <Button size="small">Like</Button>
      <Button size="small">Share</Button>
      <Button size="small">Follow</Button>
    </CardActions>
  </Card>
  )
}

export default Minicast;
