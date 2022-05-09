import "./Nav.scss";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
//import IconButton from "@mui/material/IconButton";
//import MenuIcon from "@mui/icons-material/Menu";

import React from "react";

export default function Nav() {
  return (
    <Box sx={{ width: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h5" color="inherit" component="div" sx={{ flexGrow: 1 }}>
            PodFast
          </Typography>
          <Button href='/' color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
