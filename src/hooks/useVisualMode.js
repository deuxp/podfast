import { useState } from "react";

export function useVisualMode(initialState) {
  const [mode, setMode] = useState(initialState);

  // stack structure last in -> first out
  const [history, setHistory] = useState([initialState]); // array

  const back = () => {
    setHistory((prev) => {
      let newModeList;
      if (prev.length > 1) {
        newModeList = prev.map((mode, index, list) => {
          if (!index + 1 === list.length) {
            // skips last one
            return mode;
          }
        }); // end map
      } // end if
      setMode([...newModeList]);
    });
  }; // end back

  const transition = (newMode) => {
    setHistory((prev) => [...prev, newMode]);
    setMode(newMode);
  };

  return {
    mode,
    transition,
    back,
    history,
  };
}
