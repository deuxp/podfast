import React from "react";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import LockIcon from "@mui/icons-material/Lock";
import Typography from "@mui/material/Typography";
import axios from "axios";

function Login({
  handleClickClose,
  password,
  setPassword,
  email,
  setEmail,
  handleLogin,
  handleRegister,
  setRegister,
  register,
  setUserSession,
}) {
  const setSession = () => {
    axios
      .post("http://localhost:8080/users/login", { email, password })
      .then((data) => {
        const user = data;
        setUserSession(user.data.user);
      })
      .then(() => {
        handleClickClose();
      })
      .catch((e) =>
        console.log("something happened with the post login", e?.message)
      );
  };

  const setSession2 = async () => {
    try {
      const userOb = await handleLogin();
      setUserSession(userOb.data.user);
    } catch (err) {
      console.log("error in login post", err?.message);
    }
  };

  return (
    <>
      <Box
        sx={{
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <LockIcon />
        {!register && <DialogTitle>Login</DialogTitle>}
        {register && <DialogTitle>Register</DialogTitle>}
        <DialogContent>
          <TextField
            autoFocus
            required
            id="outlined-email-input"
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ padding: "0.5rem", marginTop: "1rem" }}
          />
          <br />
          <TextField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            sx={{ padding: "0.5rem 0rem 0.5rem 0.5rem" }}
          />
        </DialogContent>
        {!register && (
          <em>
            <u>
              <Typography
                onClick={() => setRegister(true)}
                sx={{
                  color: "blue",
                  "&:hover": { color: "red", cursor: "pointer" },
                }}
              >
                Register
              </Typography>
            </u>
          </em>
        )}
        <DialogActions>
          <Button onClick={handleClickClose}>Cancel</Button>
          {!register && <Button onClick={() => setSession2()}>Login</Button>}
          {register && <Button onClick={handleRegister}>Register</Button>}
        </DialogActions>
      </Box>
    </>
  );
}

export default Login;
