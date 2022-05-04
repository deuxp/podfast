import { useState, useEffect } from "react";
import Player from "./Components/Player";
import Minicast from "./Components/Minicast";
import minicasts from "./db/mockData";
import React from "react";

// mocked article

function App() {
  const [state, setState] = useState({});

  // initial get from the server (mocked for now from import "./db/mockData")
  useEffect(() => {
    setState({
      ...state,
      minicasts: minicasts, // [{}] array of objects
    });
  }, []);

  /* ----------------------------- helper function ---------------------------- */

  return (
    <>
      <Player />
      <Minicast />
    </>
  );
}

export default App;
