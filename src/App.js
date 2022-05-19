import * as React from "react";

import { useState, useEffect } from "react";
import axios from "axios";
/*************************Poodle Logo Pic*************************** */
import Poodle from "../src/assets/PoodleGraphic.png";
/****************************** CSS *********************************** */
import "./App.scss";
/****************************** React Router *********************************** */

import { BrowserRouter, Routes, Route } from "react-router-dom";

/*************************Custom Components*************************** */
import Player from "./Components/Player";
import MinicastList from "./Components/MinicastList";
import Faves from "./Components/Faves";
import Nav from "./Components/Nav";
import Dashboard from "./Components/Dashboard";
import DynamicMinicast from "./Components/DynamicMinicast.js";
import ListItemLink from "./Components/ListItemLink";
/************************** MUI Components***************************************** */

import {
  Box,
  Toolbar,
  ThemeProvider,
  createTheme,
  List,
  Divider,
  ListItemButton,
  ListItemText,
  ExpandLess,
  ExpandMore,
  Collapse,
  ListItem,
  Switch,
  Container,
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
  const [currentCast, setCurrentCast] = useState();
  /* ---------------------------- Dashboard toggle ---------------------------- */
  const [dashboard, setDashboard] = useState(true);
  /* ---------------------------- Menu state  ---------------------------- */
  const [open, setOpen] = useState(false);
  const [autoplay, setAutoplay] = useState(false);

  // current logged in user as object
  const [userID, setUserID] = useState("");
  // id of current selected user face
  const [creatorID, setCreatorID] = useState("");

  const GET_URL = "http://localhost:8080/minicasts";

  // sets the user session from local storage on refresh
  useEffect(() => {
    const userString = localStorage.getItem("minicastUser");
    if (userString) {
      const user = JSON.parse(userString);
      setUserID(user);
    }
  }, []);

  // initial get from the server
  useEffect(() => {
    axios
      .get(GET_URL)
      .then((res) => {
        setPlaylist(res.data);
        setCurrentCast(playlist[0]);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);

  const handleAutoPlaySwitch = (event) => {
    setAutoplay(event.target.checked);
  };

  return (
    <UserContext.Provider value={userID}>
      <BrowserRouter>
        <div className="App">
          <ThemeProvider theme={theme}>
            <Nav setUserID={setUserID} />

            <Container>
              <div className="main-grid">
                <div className="player-box">
                  <Player
                    playlist={playlist}
                    autoplay={autoplay}
                    currentCast={currentCast}
                    setCurrentCast={setCurrentCast}
                  />
                </div>
                {/*****new React Routing logic to toggle between minicasts, dashboard, and individual minicasts***** */}
                <div className="main-box">
                  <Routes>
                    <Route
                      path="/minicasts/:id"
                      element={
                        <DynamicMinicast
                          minicasts={playlist}
                          onChange={setCurrentCast}
                        />
                      }
                    />
                    <Route
                      path="*"
                      element={
                        <MinicastList
                          minicasts={playlist}
                          onChange={setCurrentCast}
                          setDashboard={setDashboard}
                          setCreatorID={setCreatorID}
                          creatorID={creatorID}
                        />
                      }
                    />
                    <Route
                      exact
                      path="/dashboard"
                      element={<Dashboard setDashboard={setDashboard} />}
                    />
                    <Route
                      path="/minicasts/:id"
                      element={<DynamicMinicast onChange={setCurrentCast} />}
                    />
                    <Route
                      path="/users/:id/minicasts/"
                      element={
                        <MinicastList
                          minicasts={playlist}
                          onChange={setCurrentCast}
                          setDashboard={setDashboard}
                          setCreatorID={setCreatorID}
                          creatorID={creatorID}
                        />
                      }
                    />

                    <Route
                      path="/favourites"
                      element={
                        <Faves minicasts={playlist} onChange={setCurrentCast} />
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
                      // bgcolor: "background.paper",
                      bgcolor: "transparent",
                    }}
                  >
                    {/* <Toolbar /> */}
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
                      <Divider />

                      <div onClick={() => setCreatorID("")}>
                        <ListItemLink
                          to="/minicasts"
                          primary="Home"
                          icon={null}
                          button={true}
                          key="Home"
                        />
                      </div>

                      <div onClick={() => setCreatorID("")}>
                        <ListItemLink
                          to="/dashboard"
                          primary="Dashboard"
                          icon={null}
                          button={true}
                          key="Dashboard"
                        />
                      </div>

                      <Divider />
                      {!dashboard ? (
                        <>
                          <ListItemButton onClick={() => setOpen(!open)}>
                            <ListItemText primary="Playlist" />
                            {open ? <ExpandLess /> : <ExpandMore />}
                          </ListItemButton>
                          <Collapse in={open} unmountOnExit>
                            <ul>
                              {playlist.map((item, index) => {
                                return (
                                  <ListItemLink
                                    to={`/minicasts/${item.id}`}
                                    primary={item.title}
                                    button={false}
                                    key={item.id}
                                  />
                                );
                              })}
                            </ul>
                          </Collapse>
                          <div onClick={() => setCreatorID("")}>
                            {userID && (
                              <ListItemLink
                                to="/favourites"
                                primary="Favourites"
                                icon={null}
                                button={true}
                                key="Favourites"
                              />
                            )}
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                      <Divider />
                    </List>
                    <div>
                      <img src={Poodle} />
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
