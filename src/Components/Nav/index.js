import "./Nav.scss";
import Login from "../Login";
import { useUserAuth } from "../../hooks/useUserAuth";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Avatar } from "@mui/material";

export default function Nav() {
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
  } = useUserAuth();

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
            />
          </Dialog>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
