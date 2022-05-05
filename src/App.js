import { useState, useEffect } from "react";
import Player from "./Components/Player";
import Minicast from "./Components/Minicast";
import minicasts from "./db/mockData";
import React from "react";

// mocked article

function App() {
  const [state, setState] = useState({});
  // plays the next song on state change, feed it the next song
  const [playlist, setPlaylist] = useState([]); // ana rray of minicast objects
  // const [song, setSong] = useState("");

  // initial get from the server (mocked for now from import "./db/mockData")
  useEffect(() => {
    setState({
      ...state,
      minicasts: minicasts, // [{}] array of objects
    });
  }, []);

  /* ----------------------------- helper function ---------------------------- */

  // function to build a short list of casts to listen to on the front page
  // as of now just makes a list, no filter, impose a limit 6
  //implement lazy loading ...
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

  const playNextCast = (list) => {
    // needs to alter the list and set the playlist state
    const newList = list.filter((minicast, index) => {
      if (index) return minicast;
    });
    console.log("when the song is over -> ", newList);
    setPlaylist(newList);
  };

  return (
    <>
      <Player play={playlist} playNextCast={() => playNextCast(playlist)} />
      <Minicast />
    </>
  );
}

export default App;
