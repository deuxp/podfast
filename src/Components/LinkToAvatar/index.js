import React from "react";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";

function LinkToAvatar({ avatar_link, path, handleLink }) {
  return (
    <Link to={path}>
      <Avatar
        src={avatar_link}
        onClick={handleLink}
        sx={{
          border: "solid #6811d8",
          zIndex: "999",
          // transform: "scale(2)",
          "&:hover": { transition: "0.2s", transform: "scale(1.3)" },
        }}
      ></Avatar>
    </Link>
  );
}

export default LinkToAvatar;
