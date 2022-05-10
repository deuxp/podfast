import React from "react";
import { useState, useEffect } from "react";
import "./App.scss";
import Player from "./Components/Player";
import minicasts from "./db/mockData";
import MinicastList from "./Components/MinicastList";
import Nav from "./Components/Nav";
import Dashboard from "./Components/Dashboard";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
//import Typography from "@mui/material/Typography";
import { ThemeProvider, createTheme } from "@mui/material/styles";
//import Button from '@mui/material/Button';
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";


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

  /* ---------------------------- Dashboard toggle ---------------------------- */
  const [dashboard, setDashboard] = useState(true); // needs

  // initial get from the server (mocked for now from import "./db/mockData")
  useEffect(() => {
    setState({
      ...state,
      minicasts: minicasts, // [{}] array of objects
    });
  }, []);

  /* ----------------------------- helper function ---------------------------- */

  // //function to build a short list of casts to listen to on the front page
  // // as of now just makes a list, no filter, impose a limit 6
  // //implement lazy loading ...
  const buildList = (state, filter) => {
    return new Promise((resolve, reject) => {
      if (!state.minicasts) return [];
      resolve(state.minicasts);
    }).catch((e) => console.log(e.message));
  };

  useEffect(() => {
    // expect array of article objects
    buildList(state)
      .then((shortlist) => {
        return shortlist;
      })
      .then((shortList) => {
        setPlaylist(shortList);
        console.log("the current playlist -> ", playlist);
      });
  }, [state]);

  const playNextSong = (list) => {
    // needs to alter the list and set the playlist state
    const newList = list.filter((article, index) => {
      if (index) return article;
    });
    console.log("when the song is over -> ", newList);
    setPlaylist(newList);
  };

  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (_event, index) => {
    setSelectedIndex(index);
    if (index === 1)
      setDashboard(true);
    if (index === 0)
      setDashboard(false);
  };

  return (

    <div className="App">
      <ThemeProvider theme={theme}>
        <Nav />
      </ThemeProvider>


      <div className="main-grid">
        <div className="player-box">
          <section className="console">
            <Player play={playlist} playNextSong={() => playNextSong(playlist)} />
          </section>
        </div>

        <div className="menu-box">
          <section className="minicasts-dashboard">
            {!dashboard && <MinicastList minicasts={playlist} />}
            {dashboard && <Dashboard />}
          </section>
        </div>

        <div className="main-box">
          <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <Toolbar />
            <List>
              <ListItemButton
                key="Profile"
                selected={selectedIndex === 0}
                onClick={(event) => handleListItemClick(event, 0)}
              >
                <ListItemText primary="Profile" />
              </ListItemButton>
              <ListItemButton
                key="Dashboard"
                selected={selectedIndex === 1}
                onClick={(event) => handleListItemClick(event, 1)}
              >
                <ListItemText primary="Dashboard" />
              </ListItemButton>
              <ListItemButton
                key="Following"
                selected={selectedIndex === 3}
                onClick={(event) => handleListItemClick(event, 3)}
              >
                <ListItemText primary="Following" />
              </ListItemButton>
            </List>
            <Divider />
          </Box>
        </div>
      </div>
    </div>
  );
}

export default App;
