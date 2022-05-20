import { useEffect, memo } from "react";
import { useRecorder } from "../../hooks/useRecorder";
import UploadBanner from "../UploadBanner";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import Fab from "@mui/material/Fab";
import SettingsVoiceIcon from "@mui/icons-material/SettingsVoice";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Typography } from "@mui/material";
const MicRecorder = require("mic-recorder-to-mp3");

const Recorder = memo(({ categories, setRecording, setStop, setHidden }) => {
  const defaultRecorderState = {
    file: null,
    playback: new Audio(""), // URL.createObjectURL(file) // arg
    banner: "",
  };

  // useRecorder Hook
  const {
    save,
    setBanner,
    title,
    setTitle,
    description,
    setDescription,
    onRecord,
    onStop,
    onPlay,
    onPause,
    onPost,
    open,
    mode,
    tag,
    handleChange,
  } = useRecorder(defaultRecorderState);

  const handleRecord = () => {
    onRecord().then(() => {
      setRecording(true);
      setHidden(false);
    });
  };

  const handleStop = () => {
    onStop();
    setRecording(false);
    setStop(true);
  };

  const handlePost = () => {
    onPost();
    setRecording(false);
    setStop(false);
    setHidden(true);
  };

  // collect memory leak on unMount
  useEffect(() => {
    return () => {
      URL.revokeObjectURL(save.file);
    };
  }, []);

  /* -------------------------------------------------------------------------- */
  /*                                 THE RENDER                                 */
  /* -------------------------------------------------------------------------- */
  return (
    <>
      <Typography variant="h4" sx={{ ml: 5 }}>
        Record A Minicast
      </Typography>
      <Box
        sx={{
          marginLeft: "24px",
          borderRadius: "15px",
          border: "dashed 6px rgba(208, 179, 255, 1)",
          marginRight: "10%",
          transition: "background-color 2s, box-shadow 0.5s",
          backgroundColor: "rgba(209, 150, 255, 1)",
          boxShadow: "5px 5px #383434",
          "&:hover": {
            backgroundColor: "rgba(226, 166, 255, 1)",
          },
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <TextField
            id="castTitle"
            label="Title"
            variant="standard"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{
              padding: "0.5rem",
              width: "70%",
              marginTop: "0.5rem",
              marginLeft: "0.5rem",
            }}
          />
          <UploadBanner setBanner={setBanner} />
        </Box>

        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">
            Category
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={tag}
            onChange={handleChange}
            label="Category"
          >
            {categories &&
              categories.map((category, i) => (
                <MenuItem key={i} value={category.id}>
                  {category.tag}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        <p
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            paddingRight: "1rem",
            transition: "2s",
            color: "grey",
          }}
        >
          {save.banner.path || ""}
        </p>

        <TextField
          id="castDescription"
          multiline
          label="Description"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ padding: "0.5rem", marginTop: "0.5rem", width: "90%" }}
        />

        <Container
          maxWidth="sm"
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            padding: "1rem",
            justifyContent: "flex-end",
            flexShrink: "0",
          }}
        >
          {mode !== "RECORD" && (
            <Fab
              aria-label="add"
              onClick={() => handleRecord()}
              sx={{
                marginRight: "0.5rem",
                backgroundColor: "rgba(0, 255, 240, 1)",
                border: "solid rgba(147, 246, 223, 1)",
                transition: "background-color 0.2s, box-shadow 0.1s",
                "&:hover": {
                  backgroundColor: "rgba(226, 166, 255, 1)",
                  opacity: [0.9, 0.8, 0.7],
                  boxShadow: "5px 5px #383434",
                },
              }}
            >
              <SettingsVoiceIcon sx={{ color: "red" }} />
            </Fab>
          )}

          {mode !== "STOP" && (
            <Fab
              onClick={() => handleStop()}
              aria-label="add"
              sx={{
                color: "rgba(120, 38, 254, 1)",
                marginRight: "0.5rem",
                backgroundColor: "rgba(0, 255, 240, 1)",
                border: "solid rgba(147, 246, 223, 1)",
                transition: "background-color 0.2s, box-shadow 0.1s",
                "&:hover": {
                  backgroundColor: "rgba(226, 166, 255, 1)",
                  opacity: [0.9, 0.8, 0.7],
                  boxShadow: "5px 5px #383434",
                },
              }}
            >
              <StopCircleIcon />
            </Fab>
          )}

          {
            <Fab
              onClick={() => onPlay()}
              aria-label="add"
              sx={{
                color: "rgba(120, 38, 254, 1)",
                marginRight: "0.5rem",
                backgroundColor: "rgba(0, 255, 240, 1)",
                border: "solid rgba(147, 246, 223, 1)",
                transition: "background-color 0.2s, box-shadow 0.1s",
                "&:hover": {
                  backgroundColor: "rgba(226, 166, 255, 1)",
                  opacity: [0.9, 0.8, 0.7],
                  boxShadow: "5px 5px #383434",
                },
              }}
            >
              {<PlayCircleIcon />}
            </Fab>
          }

          {
            <Button
              onClick={() => handlePost()}
              variant={save.file ? "outlined" : "disabled"}
              sx={{
                backgroundColor: "rgba(208, 179, 255, 1)",
                color: "rgba(120, 38, 254, 1)",
                transition: "0.3s",
                "&:hover": {
                  backgroundColor: "rgba(226, 166, 255, 1)",
                  opacity: [0.9, 0.8, 0.7],
                  boxShadow: "5px 5px #383434",
                },
              }}
              size="large"
            >
              Post
            </Button>
          }
        </Container>

        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    </>
  );
});

export default Recorder;
