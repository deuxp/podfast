import { useState, useEffect } from "react";
import Player from "./Components/Player";
import Minicast from "./Components/Minicast";
import minicasts from "./db/mockData";
import React from "react";

// mocked article

function App() {
  const [state, setState] = useState({});
  // plays the next song on state change, feed it the next song
  const [song, setSong] = useState();

  // initial get from the server (mocked for now from import "./db/mockData")
  useEffect(() => {
    setState({
      ...state,
      minicasts: minicasts, // [{}] array of objects
    });
  }, []);

  /* ----------------------------- helper function ---------------------------- */
  console.log(state);
  // function to build a short list of casts to listen to on the front page
  // as of now just makes a list, no filter, impose a limit 6
  const buildList = (state, filter) => {
    //implement lazy loading
    return new Promise((resolve, reject) => {
      const shortList = state.minicasts; // used to build the articles
      resolve(shortList);
    }).catch((e) => console.log(e));
  };

  // list of urls for the player to consume
  const ulrList = (shortList) => {
    if (!shortList) return [];
    return shortList.map((cast) => cast.audio_link); // audio_link refering to the url of song
  };

  // [].length = 8
  // console;

  const playNextSong = (next) => {
    // destroy list entry of played

    // set next play
    setSong(next);
  };

  buildList(state)
    .then((shortlist) => {
      return shortlist;
    })
    .then((shortList) => {
      return ulrList(shortList);
    })
    .then((urls) => {
      // do something with the urls
      playNextSong(urls[0]);
    });
  // expect array of two urls

  return (
    <>
      <Player play={song} playNextSong={() => playNextSong()} />
      <Minicast />
    </>
  );
}

export default App;
