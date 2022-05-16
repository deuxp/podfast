import React from "react";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import LockIcon from "@mui/icons-material/Lock";

function Login({
  handleClickClose,
  password,
  setPassword,
  email,
  setEmail,
  handleLogin,
}) {
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
        <DialogTitle>Login</DialogTitle>
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
            sx={{ padding: "0.5rem" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickClose}>Cancel</Button>
          <Button onClick={handleLogin}>Login</Button>
        </DialogActions>
      </Box>
    </>
  );
}

export default Login;
