import React from "react";
import { Button } from "@mui/material";

function FavouriteButton({ user, fave, handleClick }) {
  const renderedButton = (
    <Button variant="contained" size="small" onClick={handleClick}>
      {fave ? "Remove from Favorites" : "Add to Favorites"}
    </Button>
  );

  return (
    <>
      {user && renderedButton}
      {!user && <Button></Button>}
    </>
  );
}

export default FavouriteButton;

// // old
// {user && (
//   <Button size="small" onClick={() => onPost()}>
//     {fave ? "Remove from Favorites" : "Add to Favorites"}
//   </Button>
// )}
// {!user && <Button></Button>}
