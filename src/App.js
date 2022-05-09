import React from "react";
import { useState, useEffect } from "react";
import "./App.scss";
import Player from "./Components/Player";
import minicasts from "./db/mockData";
import MinicastList from "./Components/MinicastList";
//import Nav from "./Components/Nav";
import Dashboard from "./Components/Dashboard";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link as RouterLink
} from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Button from '@mui/material/Button';
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Link from '@mui/material/Link';

const drawerWidth = 350;

const theme = createTheme({
  palette: {
    primary: {
      main: '#6811d8',
      light: '#a04bff',
      dark: '#2700a5',
      contrastText: '#fff',
    },
    secondary: {
      main: '#32f7e6',
      light: '#7cffff',
      dark: '#00c3b4',
      contrastText: '#000',
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


  return (
    <Router>
      <div className="App">
        <ThemeProvider theme={theme}>
          <Box sx={{ width: 1 }}>
            <AppBar position="static">
              <Toolbar variant="dense">
                <Typography variant="h5" color="inherit" component="div" sx={{ flexGrow: 1 }}>
                  PodFast
                </Typography>
                <Button  href='/dashboard' color="inherit">Dashboard</Button>
                <Button  href='/' color="inherit">Login</Button>
              </Toolbar>
            </AppBar>
          </Box>
        </ThemeProvider>

        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              zIndex: -10
            }
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar />
          <List>
            <ListItem button key="Profile" component={Link} to="/"  >
              <ListItemText primary="Profile" />
            </ListItem>
            <ListItem button key="Dashboard" component={Link} to="/dashboard"  >
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button key="Following" component={Link} to="/"  >
              <ListItemText primary="Following" />
            </ListItem>
          </List>
          <Divider />
        </Drawer>

        <main className="main-container">
          <section className="console">
            <Player play={playlist} playNextSong={() => playNextSong(playlist)} />
          </section>

          <Routes>
            <Route path="/" element={<MinicastList minicasts={playlist} />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>

        </main>

      </div>
    </Router>

  );
}

export default App;
