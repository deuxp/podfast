import { useState } from "react";

export function useUserAuth() {
  const [open, setOpen] = useState(false);
  const [register, setRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClickOpen = (e) => {
    setOpen(true);
  };
  const handleClickClose = (e) => {
    setOpen(false);
    setRegister(false);
  };
  const handleLogin = (e) => {
    console.log("handle user auth");
    setOpen(false);
  };

  const handleRegister = (e) => {
    console.log("handle create new user");
    setOpen(false);
    setRegister(false);
  };

  return {
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
  };
}
