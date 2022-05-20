import "./Nav.scss";
import { useContext } from "react";
import { UserContext } from "../../App";

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
  const user = useContext(UserContext);

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
      <AppBar position="fixed">
        <Toolbar variant="dense">
          <Typography
            variant="h5"
            color="inherit"
            component="div"
            sx={{ flexGrow: 1, fontFamily: "'Cairo', sans-serif" }}
          >
            PodFast
          </Typography>

          <Button variant="outlined" onClick={handleClickOpen}>
            <Avatar
              src={user?.avatar_link}
              onClick={handleClickOpen}
              sx={{
                border: "solid rgba(0, 255, 240, 1)",
                "&:hover": { transition: "0.2s", transform: "scale(1.15)" },
              }}
            />
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
