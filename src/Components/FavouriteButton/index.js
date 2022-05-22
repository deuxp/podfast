import React from "react";
import { Button, Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

function FavouriteButton({ user, fave, handleClick }) {
  const renderedButton = (
    <Box
      // variant="contained"
      // size="small"
      onClick={handleClick}
      sx={{
        color: fave ? "rgba(104,17,216, .9)" : "rgba(255,255,255, 1)",
        display: "flex",
        backgroundColor: fave ? "rgb(1,255,239)" : "rgba(104,17,216, .9)",
        padding: "0.3rem",
        borderRadius: "10px",
        border: "2px solid rgb(226,165,254)",
        transition: "0.2s",
        "&:hover": { transform: "scale(1.3)" },
      }}
    >
      {fave ? <StarIcon /> : <StarBorderIcon />}
    </Box>
  );

  return (
    <>
      {user && renderedButton}
      {!user && <Button></Button>}
    </>
  );
}

export default FavouriteButton;
