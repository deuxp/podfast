import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
/*************************Poodle Logo Pic*************************** */
import Poodle from "../src/assets/PoodleGraphic.png"
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
  Container
} from './mui';


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
  const [currentCast, setCurrentCast] = useState([0]);
  /* ---------------------------- Dashboard toggle ---------------------------- */
  const [dashboard, setDashboard] = useState(true); // needs
  /* ---------------------------- Menu state  ---------------------------- */
  const [selectedIndex, setSelectedIndex] = useState();
  const [open, setOpen] = useState(false);
  const [autoplay, setAutoplay] = useState(false);

  const GET_URL = "http://localhost:8080/minicasts";

  // initial get from the server 
  useEffect(() => {
    axios
      .get(GET_URL)
      .then((res) => {
        setPlaylist(res.data)
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);

  

  const handleAutoPlaySwitch = event => {
    setAutoplay(event.target.checked);
  }

  return (

    <BrowserRouter>
      <div className="App">

        <ThemeProvider theme={theme}>
          <Nav />

          <Container>
            <div className="main-grid">
              <div className="player-box">
                <Player
                  playlist={playlist}
                  autoplay={autoplay}
                  currentCast={currentCast}
                  onEnded={() => setCurrentCast(currentCast + 1)}
                />
              </div>
              {/*****new React Routing logic to toggle between minicasts, dashboard, and individual minicasts***** */}
              <div className="main-box">
                <Routes>
                  <Route path="*" element={<MinicastList minicasts={playlist}
                    onChange={setCurrentCast}
                    setDashboard={setDashboard} />} />
                  <Route exact path="/dashboard" element={<Dashboard setDashboard={setDashboard} />} />
                  <Route path="/minicasts/:id" element={<DynamicMinicast minicasts={playlist}
                    onChange={setCurrentCast} />} />
                </Routes>
              </div>

              <div className="side-bar">
                <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}    >
                  <Toolbar />
                  <List>

                    <ListItem>
                      <ListItemText id="switch-list-label-autoplay" primary="Autoplay" />
                      <Switch
                        checked={autoplay}
                        onChange={handleAutoPlaySwitch}
                        inputProps={{ 'aria-label': 'controlled' }}
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
                    {!dashboard ? (<><ListItemButton onClick={() => setOpen(!open)}>
                      <ListItemText primary="Playlist" />
                      {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                      <Collapse in={open} unmountOnExit>
                        <ul>
                          {playlist.map((item, index) => {
                            return <ListItemLink
                              to={`/minicasts/${index}`}
                              primary={item.title}
                              button={false}
                              key={index}
                            />
                          })}
                        </ul>
                      </Collapse>
                      <ListItemButton>
                        <ListItemText primary="Favorites" />
                      </ListItemButton> </>) : ""}
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
  );
}

export default App;


/* ----------------------------- helper function ----------------------------

// //function to build a short list of casts to listen to on the front page
// // as of now just makes a list, no filter, impose a limit 6
// //implement lazy loading ...
const buildList = (state, filter) => {
  return new Promise((resolve, reject) => {
    if (!playlist) return [];
    resolve(playlist);
  }).catch((e) => console.log(e.message));
};

const playNextSong = (list) => {
  // needs to alter the list and set the playlist state
  const newList = list.filter((article, index) => {
    if (index) return article;
  });
  console.log("when the song is over -> ", newList);
  setPlaylist(newList);
};
*/
