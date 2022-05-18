import { useState } from "react";
import axios from "axios";

export function useUserAuth() {
  const [open, setOpen] = useState(false);
  const [register, setRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickClose = () => {
    setOpen(false);
    setRegister(false);
  };

  const handleLogout = () => {
    console.log("\t\tLogging out!");
    localStorage.removeItem("minicastUser");
    setLoggedIn(false);
  };

  //returns the user object after veification
  const handleLogin = async (e) => {
    console.log("handle user auth");
    try {
      const { data } = await axios.post("http://localhost:8080/users/login", {
        email,
        password,
      });

      if (!data || !data?.user) {
        setErrorMessage("invalid login credentials");
        return;
      }
      handleClickClose();
      if (data?.user) {
        const { user } = data;
        localStorage.setItem("minicastUser", JSON.stringify(user));
        setLoggedIn(true);
        return user;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleRegister = () => {
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
    errorMessage,
    handleLogout,
    loggedIn,
  };
}
