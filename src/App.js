import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
/*************************Poodle Logo Pic*************************** */
import Poodle from "../src/assets/PoodleGraphic.png"
/****************************** CSS *********************************** */
import "./App.scss";
/****************************** React Router *********************************** */
import { BrowserRouter, Routes, Route, NavLink, MemoryRouter, Link as RouterLink } from "react-router-dom";
import { StaticRouter } from 'react-router-dom/server';
/*************************Custom Components*************************** */
import Player from "./Components/Player";
import MinicastList from "./Components/MinicastList";
import Nav from "./Components/Nav";
import Dashboard from "./Components/Dashboard";
/************************** MUI Components***************************************** */
import ListItemIcon from '@mui/material/ListItemIcon';
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

const LinkBehavior = React.forwardRef((props, ref) => (
  <RouterLink ref={ref} to="/" {...props} role={undefined} />
));

function Router(props) {
  const { children } = props;
  if (typeof window === 'undefined') {
    return <StaticRouter location="/">{children}</StaticRouter>;
  }

  return <MemoryRouter>{children}</MemoryRouter>;
}

function ListItemLink(props) {
  const { icon, primary, to, button } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef(function Link(itemProps, ref) {
        return <RouterLink to={to} ref={ref} {...itemProps} role={undefined} />;
      }),
    [to],
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


  const renderLink = React.useMemo(
    () =>
      React.forwardRef(function Link(itemProps, ref) {
        return <RouterLink to="/dashboard" ref={ref} {...itemProps} role={undefined} />;
      }),
    ["/dashboard"],
  );

  const handleListItemClick = (_event, index) => {
    setSelectedIndex(index);
    if (index === 1) setDashboard(true);
    if (index === 0) setDashboard(false);
  };

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
              <div className="main-box">
                <Routes>
                  <Route path="*" element={<MinicastList minicasts={playlist} onChange={setCurrentCast} />} />
                  <Route exact path="/dashboard" element={<Dashboard />} />
                </Routes>
              </div>

              {/* <div className="main-box">
                {!dashboard && <MinicastList minicasts={playlist} onChange={setCurrentCast} />}
                {dashboard && <Dashboard />}
  </div> */}


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

                    <ListItemButton
                      key="Home"
                      selected={selectedIndex === 0}
                      onClick={(event) => handleListItemClick(event, 0)}
                    >
                      <ListItemText primary="Home" />
                    </ListItemButton>

                    <ListItemLink
                      to="/dashboard"
                      primary="Dashboard2"
                      icon={null}
                      button={true}
                      key="Dashboard2"
                      selected={selectedIndex === 1}
                      onClick={(event) => handleListItemClick(event, 1)}
                    />

                    <ListItemButton
                      key="Dashboard"
                      selected={selectedIndex === 1}
                      onClick={(event) => handleListItemClick(event, 1)}
                      component={renderLink}
                    >
                      <ListItemText primary="Dashboard" />
                    </ListItemButton>
                    <Divider />
                    {!dashboard ? (<><ListItemButton onClick={() => setOpen(!open)}>
                      <ListItemText primary="Playlist" />
                      {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                      <Collapse in={open} unmountOnExit>
                        <ul>
                          {playlist.map((item, index) => {
                            return (<li key={index}>{item.title}</li>)
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
