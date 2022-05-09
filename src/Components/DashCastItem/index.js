import React from "react";
import Box from "@mui/material/Box";

function DashCastItem({ cast }) {
  // bring in the data

  const renderedArticle = (
    <Box
      component="span"
      sx={{
        width: "100%",
        height: 300,
        backgroundColor: "primary.dark",
        "&:hover": {
          backgroundColor: "primary.main",
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    >
      <p>Save</p>
    </Box>
  );

  return <>{renderedArticle}</>;
}

export default DashCastItem;
