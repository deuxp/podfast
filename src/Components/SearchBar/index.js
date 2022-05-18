import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { Tooltip } from "@mui/material";


export default function SearchBar(props) {

  // hardcoded category data but need to swap this for a get request of the categories
  const data = [
    "comedy",
    "education",
    "history",
    "lifestyle",
    "music",
    "news",
    "science",
    "trailers",
    "travel"
  ];

  const filterData = (query, data) => {
    if (!query) {
      return data;
    } else {
      return data.filter((d) => d.toLowerCase().includes(query));
    }
  };

  const [searchQuery, setSearchQuery] = useState("");
  const dataFiltered = filterData(searchQuery, data);

  return (

    <form  >
      <Tooltip
        disableFocusListener
        disableTouchListener
        arrow
        title={dataFiltered.map(d => (
          <p>{d}</p>
        ))}
      >
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
      </Tooltip>
      <IconButton type="submit" aria-label="search">
        <SearchIcon style={{ fill: "blue" }} />
      </IconButton>
    </form>

  )
};