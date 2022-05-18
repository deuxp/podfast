import "./Nav.scss";
import { useState } from "react";
import Login from "../Login";
import { useUserAuth } from "../../hooks/useUserAuth";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Avatar } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

export default function Nav({ setUserID }) {
  const {
    open,
    register,
    setRegister,
    email,
    setEmail,
    password,
    setPassword,
    handleClickOpen,
    handleClickClose,
    handleLogin,
    handleRegister,
    errorMessage,
    handleLogout,
    loggedIn,
  } = useUserAuth();

  const logoutUser = () => {
    handleLogout();
    setUserID("");
  };

  return (
    <Box sx={{ width: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography
            variant="h5"
            color="inherit"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            PodFast
          </Typography>

          <Button variant="outlined" onClick={handleClickOpen}>
            <Avatar src="" onClick={handleClickOpen} />
          </Button>

          {loggedIn && (
            <Box
              onClick={logoutUser}
              sx={{
                display: "flex",
                alignItems: "center",
                opacity: "0.5",
                "&:hover": {
                  cursor: "pointer",
                  color: "rgba(0, 255, 240, 1)",
                },
              }}
            >
              <LogoutIcon />
              <Typography variant="caption">logout</Typography>
            </Box>
          )}

          {!loggedIn && (
            <Dialog open={open} onClose={handleClickClose}>
              <Login
                handleClickClose={handleClickClose}
                password={password}
                setPassword={setPassword}
                email={email}
                setEmail={setEmail}
                handleLogin={handleLogin}
                handleRegister={handleRegister}
                setRegister={setRegister}
                register={register}
                setUserSession={setUserID}
                errorMessage={errorMessage}
              />
            </Dialog>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
