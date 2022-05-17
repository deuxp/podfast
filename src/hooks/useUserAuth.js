import { useState } from "react";
import axios from "axios";

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

  //returns the user object after veification
  const handleLogin = async (e) => {
    console.log("handle user auth");
    const verifiedUser = await axios.post("http://localhost:8080/users/login", {
      email,
      password,
    });
    handleClickClose();
    return verifiedUser;
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
