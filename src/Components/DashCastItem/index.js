import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";

function DashCastItem({ cast, updateCasts }) {
  //TODO (a) build the article (b) destroy button (c) confirmation

  const { title, description, audio_link, banner_link, id } = cast;

  const renderedArticle = (
    <Box
      component="span"
      sx={{
        width: "40vw",
        marginLeft: "-10px",
        border: "dashed",
        borderRadius: "10px",
        backgroundImage: `url(${banner_link})`,
        "&:hover": {
          backgroundColor: "grey",
          // opacity: [0.9, 0.8, 0.7],
        },
      }}
    >
      <Typography
        variant="body1"
        gutterBottom
        sx={{
          backgroundColor: "rgba(241, 236, 227, 1)",
          display: "inline-block",
          padding: "0.3rem",
          opacity: "0.9",
          borderRadius: "8px",
          marginLeft: "0.3rem",
          marginTop: "0.3rem",
        }}
      >
        Minicast ID: {id}
      </Typography>
      <br></br>
      <Typography
        variant="body1"
        gutterBottom
        sx={{
          backgroundColor: "rgba(241, 236, 227, 1)",
          display: "inline-block",
          padding: "0.3rem",
          opacity: "0.9",
          borderRadius: "8px",
          marginLeft: "0.3rem",
        }}
      >
        Title: {title}
      </Typography>
      <br></br>
      <Typography
        variant="body1"
        gutterBottom
        sx={{
          backgroundColor: "rgba(241, 236, 227, 1)",
          display: "inline-block",
          padding: "0.3rem",
          opacity: "0.9",
          borderRadius: "8px",
          marginLeft: "0.3rem",
        }}
      >
        Description:
      </Typography>
      <br></br>
      <Typography
        variant="body1"
        gutterBottom
        sx={{
          backgroundColor: "rgba(241, 236, 227, 1)",
          display: "inline-block",
          padding: "0.3rem",
          opacity: "0.9",
          borderRadius: "8px",
          marginLeft: "0.3rem",
        }}
      >
        {description}
      </Typography>
      <br></br>
      <Button
        variant="contained"
        onClick={() => handleClick()}
        sx={{ margin: "0.3rem" }}
      >
        delete post
      </Button>
      <br />
      <audio controls={true} src={audio_link} controlsList="nodownload"></audio>
    </Box>
  );

  const handleClick = () => {
    console.log("+++ post deleting +++");
    // setOpen(true);
    axios
      .delete(`http://localhost:8080/minicasts/${id}/destroy`)
      .then((response) => {
        console.log(response.data.status);
        if (response.data.status !== 204) {
          throw new Error("The server did not destroy the article");
        }
      })
      .then(() => {
        updateCasts(id);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  return <>{renderedArticle}</>;
}

export default DashCastItem;
