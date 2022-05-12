import React from "react";
import { useState, useEffect } from "react";
import "./App.scss";
import Player from "./Components/Player";
import MinicastList from "./Components/MinicastList";
import Nav from "./Components/Nav";
import Dashboard from "./Components/Dashboard";
import Poodle from "../src/assets/PoodleGraphic.png"

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import ListItem from '@mui/material/ListItem';
import Switch from '@mui/material/Switch';

import axios from "axios";
import { Container } from "@mui/material";
import { InsertEmoticonRounded, InsertEmoticonTwoTone } from "@mui/icons-material";

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
  const [state, setState] = useState({});
  const [playlist, setPlaylist] = useState([]); // gonna be a static list moving forward
  const [currentCast, setCurrentCast] = useState([0]);
  const [open, setOpen] = useState(false);
  const [autoplay, setAutoplay] = useState(false);

  /* ---------------------------- Dashboard toggle ---------------------------- */
  const [dashboard, setDashboard] = useState(true); // needs
/* ---------------------------- Menu selector ---------------------------- */
  const [selectedIndex, setSelectedIndex] = useState();

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


  /* ----------------------------- helper function ---------------------------- */

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

  const playNextCast = () => {
    if (!castsLoaded)
      return;
    if (playlist[currentCast + 1]) {
      // move to next miniCast
      setCurrentCast(currentCast + 1)
    }
    else {
      // set autoplay to off
      setAutoplay(false);
    }
  };

 

  const handleListItemClick = (_event, index) => {
    setSelectedIndex(index);
    if (index === 1) setDashboard(true);
    if (index === 0) setDashboard(false);
  };

  let castsLoaded = false;
  if (playlist) {
    castsLoaded = true;
  }

  const handleAutoPlaySwitch = event => {
    setAutoplay(event.target.checked);
  }

  return (

    <div className="App">

      <ThemeProvider theme={theme}>
        <Nav />
      </ThemeProvider>
      <Container>
        <div className="main-grid">
          <div className="player-box">
            <section className="console">
              <Player
                play={playlist}
                autoplay={autoplay}
                currentCast={currentCast}
                playNextSong={() => playNextSong(playlist)}
                playNextCast={() => playNextCast}
                onEnded={() => setCurrentCast(currentCast + 1)}
              />
            </section>
          </div>

          <div className="main-box">
            <section className="minicasts-dashboard">
              {!dashboard && <MinicastList minicasts={playlist} onChange={setCurrentCast} />}
              {dashboard && <Dashboard />}
            </section>
          </div>

          <div className="side-bar">
            <Box
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
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
                <ListItemButton
                  key="Home"
                  selected={selectedIndex === 0}
                  onClick={(event) => handleListItemClick(event, 0)}
                >
                  <ListItemText primary="Home" />
                </ListItemButton>
                <ListItemButton
                  key="Dashboard"
                  selected={selectedIndex === 1}
                  onClick={(event) => handleListItemClick(event, 1)}
                >
                  <ListItemText primary="Dashboard" />
                </ListItemButton>
              </List>
              <Divider />
              {!dashboard ? (<><ListItemButton onClick={() => setOpen(!open)}>
                <ListItemText primary="Playlist" />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
                <Collapse in={open} unmountOnExit>
                  <ul>
                    {castsLoaded ? (playlist.map((item, index) => {
                      return (<li key={index}>{item.title}</li>)
                    })) : ""}
                  </ul>
                </Collapse>
                <ListItemButton>
                  <ListItemText primary="Favorites" />
                </ListItemButton> </>) : ""}
            </Box>
            <div>
              <img src={Poodle} />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default App;
