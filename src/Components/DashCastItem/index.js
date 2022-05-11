import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

function DashCastItem({ cast }) {
  //TODO (a) build the article (b) destroy button (c) confirmation

  const { title, description, audio_link, banner_link, id } = cast;
  const renderedArticle = (
    <Box
      component="span"
      sx={{
        width: "100%",
        // height: 300,
        border: "dashed",
        borderRadius: "10px",
        backgroundImage: `url(${banner_link})`,
        padding: "1rem",
        "&:hover": {
          backgroundColor: "grey",
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    >
      <p>Minicast ID: {id}</p>
      <p>Title: {title}</p>
      <h5>Description</h5>
      <p>{description}</p>
      <Button
        variant="outlined"
        onClick={() => handleClick()}
        sx={{ marginBottom: "1rem" }}
      >
        delete post
      </Button>
      <br />
      <audio controls={true} src={audio_link}></audio>
    </Box>
  );

  const handleClick = () => {
    console.log("post deleted");
  };

  return <>{renderedArticle}</>;
}

export default DashCastItem;
