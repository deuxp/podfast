import Box from "@mui/material/Box";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import Fab from "@mui/material/Fab";
import SettingsVoiceIcon from "@mui/icons-material/SettingsVoice";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import PausePresentationIcon from "@mui/icons-material/PausePresentation";

import TextField from "@mui/material/TextField";

// font-family: 'Goldman', cursive; <-- the typography css rule

function Recorder() {
  return (
    <>
      <h2>Record a mini-cast</h2>
      <Box
        sx={{
          borderRadius: "15px",
          width: "40vw",
          height: 300,
          backgroundColor: "rgba(104, 17, 216, 1)",
          "&:hover": {
            backgroundColor: "rgba(104, 17, 216, 1)",
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      >
        <TextField id="castTitle" label="Title" variant="standard" />
        <TextField
          id="castDescription"
          label="Description"
          variant="outlined"
        />

        <Fab
          aria-label="add"
          sx={{
            backgroundColor: "rgba(0, 255, 240, 1)",
            border: "solid rgba(147, 246, 223, 1)",
          }}
        >
          <SettingsVoiceIcon />
        </Fab>
        <Fab
          aria-label="add"
          sx={{
            backgroundColor: "rgba(0, 255, 240, 1)",
            border: "solid rgba(147, 246, 223, 1)",
          }}
        >
          <StopCircleIcon />
        </Fab>
      </Box>
    </>
  );
}

export default Recorder;
