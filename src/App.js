import { useState, useEffect } from "react";
import Player from "./Components/Player";
import Minicast from "./Components/Minicast";
import minicasts from "./db/mockData";
import React from "react";

// mocked article

function App() {
  const [state, setState] = useState({});

  useEffect(() => {});

  return (
    <>
      <Player />
      <Minicast />
    </>
  );
}

export default App;
