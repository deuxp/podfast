import React from "react";
import Box from "@mui/material/Box";
import { ConstructionOutlined, CssTwoTone } from "@mui/icons-material";

function DashCastItem({ cast }) {
  //TODO build the article

  const { title, description, audio_link, banner_link, id } = cast;
  const renderedArticle = (
    <Box
      component="span"
      sx={{
        width: "100%",
        // height: 300,
        backgroundColor: "",
        border: "dashed",
        borderRadius: "10px",
        padding: "1rem",
        "&:hover": {
          backgroundColor: "grey",
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    >
      <p>{id}</p>
      <p>{title}</p>
      <p>{description}</p>
    </Box>
  );

  return <>{renderedArticle}</>;
}

export default DashCastItem;
