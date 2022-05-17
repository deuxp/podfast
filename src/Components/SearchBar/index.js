import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";


export default function SearchBar({ setSearchQuery }) {
  return (
    <form  >
      <TextField
        id="search-bar"
        className="text"
        onInput={(e) => {
          setSearchQuery(e.target.value);
        }}
        variant="outlined"
        placeholder="#trending"
        size="small"
        style={{ background: "white", borderRadius: "20px", minWidth: "300px" }}
      />
      <IconButton type="submit" aria-label="search">
        <SearchIcon style={{ fill: "blue" }} />
      </IconButton>
    </form>
  )
};