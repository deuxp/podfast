import * as React from "react";

import { useState, useEffect } from "react";
import axios from "axios";
/*************************Poodle Logo Pic*************************** */
import Poodle from "../src/assets/PoodleGraphic.png";
/****************************** CSS *********************************** */
import "./App.scss";
/****************************** React Router *********************************** */

import { BrowserRouter, Routes, Route, NavLink, MemoryRouter, useLocation, Link as RouterLink } from "react-router-dom";

/*************************Custom Components*************************** */
import Player from "./Components/Player";
import MinicastList from "./Components/MinicastList";
import Nav from "./Components/Nav";
import Dashboard from "./Components/Dashboard";
import DynamicMinicast from "./Components/DynamicMinicast.js";
import ListItemLink from "./Components/ListItemLink";
/************************** MUI Components***************************************** */
import ListItemIcon from "@mui/material/ListItemIcon";

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
  const [playlist, setPlaylist] = useState([]); // gonna be a static list moving forward
  const [currentCast, setCurrentCast] = useState();
  /* ---------------------------- Dashboard toggle ---------------------------- */
  const [dashboard, setDashboard] = useState(true); // needs
  /* ---------------------------- Menu state  ---------------------------- */
  const [open, setOpen] = useState(false);
  const [autoplay, setAutoplay] = useState(false);

  const [userID, setUserID] = useState(""); // default

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
 

  function ListItemLink(props) {
    const { icon, primary, to, button } = props;

    const renderLink = React.useMemo(
      () =>
        React.forwardRef(function Link(itemProps, ref) {
          return (
            <RouterLink to={to} ref={ref} {...itemProps} role={undefined} />
          );
        }),
      [to]
    );

    return (
      <li>
        <ListItem button={button} component={renderLink}>
          {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
          <ListItemText primary={primary} />
        </ListItem>
      </li>
    );
  }

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
                      path="*"
                      element={
                        <MinicastList
                          minicasts={playlist}
                          onChange={setCurrentCast}
                          setDashboard={setDashboard}
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
                      element={
                        <DynamicMinicast
                          onChange={setCurrentCast}
                        />
                      }
                    />
                  </Routes>
                </div>

                <div className="side-bar">
                  <Box
                    sx={{
                      width: "100%",
                      maxWidth: 360,
                      bgcolor: "background.paper",
                    }}
                  >
                    <Toolbar />
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

                      <ListItemLink
                        to="/minicasts"
                        primary="Home"
                        icon={null}
                        button={true}
                        key="Home"
                      />

                      <ListItemLink
                        to="/dashboard"
                        primary="Dashboard"
                        icon={null}
                        button={true}
                        key="Dashboard"
                      />


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
                                    to={`/minicasts/${index}`}
                                    primary={item.title}
                                    button={false}
                                    key={index}
                                  />
                                );
                              })}
                            </ul>
                          </Collapse>
                          <ListItemButton>
                            <ListItemText primary="Favorites" />
                          </ListItemButton>{" "}
                        </>
                      ) : (
                        ""
                      )}
                      <Divider />
                    </List>
                  </Box>
                  <div>
                    <img src={Poodle} />
                  </div>
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

