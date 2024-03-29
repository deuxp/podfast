import * as React from "react";

import axios from "axios";
import { useEffect, useState } from "react";
/*************************Poodle Logo Pic*************************** */
import Poodle from "../src/assets/PoodleGraphic.png";
/****************************** CSS *********************************** */
import "./App.scss";
/****************************** React Router *********************************** */

import { BrowserRouter, Route, Routes } from "react-router-dom";

/*************************Custom Components*************************** */
import Cassette from "./Components/Cassette";
import Dashboard from "./Components/Dashboard";
import DynamicMinicast from "./Components/DynamicMinicast.js";
import Faves from "./Components/Faves";
import ListItemLink from "./Components/ListItemLink";
import MinicastList from "./Components/MinicastList";
import Nav from "./Components/Nav";
import Player from "./Components/Player";
/************************** MUI Components***************************************** */

import {
  Box,
  Container,
  createTheme,
  Divider,
  List,
  ListItem,
  ListItemText,
  Switch,
  ThemeProvider,
} from "./mui";

export const UserContext = React.createContext();

const theme = createTheme({
  palette: {
    primary: {
      main: "#6811d8",
      light: "#a04bff",
      dark: "#2700a5",
      contrastText: "#fff",
    },
    secondary: {
      main: "#32f7e6",
      light: "#7cffff",
      dark: "#00c3b4",
      contrastText: "#000",
    },
  },
});

function App() {
  const [playlist, setPlaylist] = useState([]);
  const [allCasts, setAllCasts] = useState([]);
  const [currentCast, setCurrentCast] = useState();
  /* ---------------------------- Menu state  ---------------------------- */
  const [autoplay, setAutoplay] = useState(false);

  // current logged in user as object
  const [userID, setUserID] = useState("");
  // id of current selected user face
  const [creatorID, setCreatorID] = useState("");

  // recording notification
  const [recording, setRecording] = useState(false);
  const [stop, setStop] = useState(false);
  const [hidden, setHidden] = useState(true);

  const handleMenuChange = () => {
    setCreatorID("");
    setHidden(true);
  };

  const GET_URL = "http://localhost:8080/minicasts";

  // sets the user session from local storage on refresh
  useEffect(() => {
    const userString = localStorage.getItem("minicastUser");
    if (userString) {
      const user = JSON.parse(userString);
      setUserID(user);
    }
  }, []);

  /** Helper for the initial Page-load fetch
   * @returns fetched audio feed data as a Promise.
   */
  const getData = async url => {
    const data = await fetch(url, {
      method: "GET",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data.json();
  };

  // initial GET from the server
  useEffect(() => {
    getData(GET_URL)
      .then(data => {
        setPlaylist(data);
        setAllCasts(data);
      })
      .catch(err => {
        console.log("Page load fetch error: ", err);
      });
  }, []);

  // useEffect(() => {
  //   axios
  //     .get(GET_URL)
  //     .then(res => {
  //       setPlaylist(res.data);
  //       setAllCasts(res.data);
  //       console.log("fetch: ", res);
  //       // setCurrentCast(playlist[0]);
  //     })
  //     .catch(e => {
  //       console.log(e.message);
  //     });
  // }, []);

  const handleAutoPlaySwitch = event => {
    setAutoplay(event.target.checked);
  };

  // need to getAllCasts when clicking Home as they could have changed
  // for example, deleting a post on Dashboard and then going Home
  const getAllCasts = () => {
    axios
      .get(GET_URL)
      .then(res => {
        setAllCasts(res.data);
        // setCurrentCast(playlist[0]);
      })
      .catch(e => {
        console.log(e.message);
      });
  };

  return (
    <UserContext.Provider value={userID}>
      <BrowserRouter>
        <div className="App">
          <ThemeProvider theme={theme}>
            <Nav setUserID={setUserID} />

            <Container>
              <div className="main-grid">
                {/*****new React Routing logic to toggle between minicasts, dashboard, and individual minicasts***** */}
                <div className="main-box">
                  <Routes>
                    <Route
                      path="/minicasts/:id"
                      element={
                        <DynamicMinicast
                          onChange={setCurrentCast}
                          current={currentCast}
                          handleFaceCLick={setCreatorID}
                          creatorID={creatorID}
                        />
                      }
                    />
                    <Route
                      path="*"
                      element={
                        <MinicastList
                          minicasts={allCasts}
                          onChange={setCurrentCast}
                          setCreatorID={setCreatorID}
                          creatorID={creatorID}
                          setPlaylist={setPlaylist}
                          current={currentCast}
                        />
                      }
                    />
                    <Route
                      exact
                      path="/dashboard"
                      element={
                        <Dashboard
                          setRecording={setRecording}
                          setStop={setStop}
                          setHidden={setHidden}
                        />
                      }
                    />
                    <Route
                      path="/minicasts/:id"
                      element={<DynamicMinicast onChange={setCurrentCast} />}
                    />
                    <Route
                      path="/users/:id/minicasts/"
                      element={
                        <MinicastList
                          minicasts={allCasts}
                          onChange={setCurrentCast}
                          setCreatorID={setCreatorID}
                          creatorID={creatorID}
                          setPlaylist={setPlaylist}
                        />
                      }
                    />

                    <Route
                      path="users/:id/favourites"
                      element={
                        <Faves
                          creatorID={creatorID}
                          setCreatorID={setCreatorID}
                          minicasts={playlist}
                          onChange={setCurrentCast}
                          setPlaylist={setPlaylist}
                        />
                      }
                    />
                  </Routes>
                </div>

                <div className="side-bar">
                  <Box
                    style={{ position: "fixed" }}
                    sx={{
                      width: "100%",
                      maxWidth: 360,
                      bgcolor: "transparent",
                    }}
                  >
                    <div className="player-box">
                      <Player
                        playlist={playlist}
                        autoplay={autoplay}
                        currentCast={currentCast}
                        setCurrentCast={setCurrentCast}
                      />
                    </div>
                    <List>
                      <ListItem>
                        <ListItemText
                          id="switch-list-label-autoplay"
                          primary="Autoplay"
                        />
                        <Switch
                          checked={autoplay}
                          onChange={handleAutoPlaySwitch}
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      </ListItem>

                      <div
                        onClick={() => {
                          // setCreatorID("");
                          handleMenuChange();
                          getAllCasts();
                        }}
                      >
                        <ListItemLink
                          to="/minicasts"
                          primary="Home"
                          icon={null}
                          button={true}
                          key="Home"
                        />
                      </div>

                      <Divider />

                      <div onClick={() => setCreatorID("")}>
                        <ListItemLink
                          to="/dashboard"
                          primary="Dashboard"
                          icon={null}
                          button={true}
                          key="Dashboard"
                          disabled={userID ? false : true}
                        />
                      </div>

                      <div onClick={() => handleMenuChange()}>
                        {/* <div onClick={() => setCreatorID("")}> */}
                        <ListItemLink
                          to={`/users/${userID?.id}/favourites`}
                          primary="Favourites"
                          icon={null}
                          button={true}
                          key="Favourites"
                          disabled={userID ? false : true}
                        />
                      </div>

                      <Divider />
                    </List>
                    <div className="poodle">
                      <img
                        id="poodle-icon"
                        className={recording ? "rotate" : undefined}
                        style={{ padding: "0.5rem" }}
                        src={Poodle}
                      />
                      <span className="timer-container">
                        {!hidden && (
                          <Cassette recording={recording} stop={stop} />
                        )}
                      </span>
                    </div>
                  </Box>
                </div>
              </div>
            </Container>
          </ThemeProvider>
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
