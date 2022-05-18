import { useState, forwardRef } from "react";
import axios from "axios";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function DashCastItem({ cast, updateCasts }) {
  //TODO (a) build the article (b) destroy button (c) confirmation

  const { title, description, audio_link, banner_link, id } = cast;
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeletePost = () => {
    console.log("+++ post deleting +++");
    axios
      .delete(`http://localhost:8080/minicasts/${id}/destroy`)
      .then((response) => {
        console.log(response.data.status);
        if (response.data.status !== 204) {
          throw new Error("The server did not destroy the article");
        }
      })
      .then(() => {
        updateCasts(id);
      })
      .then(() => {
        handleClose();
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  const renderedArticle = (
    <Box
      component="span"
      sx={{
        width: "40vw",
        marginLeft: "-10px",
        border: "dotted white",
        borderRadius: "10px",
        backgroundImage: `url(${banner_link})`,
        trasition: "2s",
        "&:hover": {
          backgroundColor: "grey",
        },
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          margin: "0.5rem",
          padding: "0.3rem",
          borderRadius: "9px",
          opacity: "0.9",
          backgroundColor: "rgba(241, 236, 227, 1)",
        }}
      >
        <Typography
          variant="body1"
          gutterBottom
          sx={{
            backgroundColor: "rgba(241, 236, 227, 1)",
            display: "inline-block",
            padding: "0.3rem",
            opacity: "0.9",
            borderRadius: "8px",
            marginLeft: "0.3rem",
            marginTop: "0.3rem",
          }}
        >
          <strong>Minicast ID:</strong> {id}
        </Typography>
        <br></br>
        <Typography
          variant="body1"
          gutterBottom
          sx={{
            backgroundColor: "rgba(241, 236, 227, 1)",
            display: "inline-block",
            padding: "0.3rem",
            opacity: "0.9",
            borderRadius: "8px",
            marginLeft: "0.3rem",
          }}
        >
          <strong>Title:</strong> {title}
        </Typography>
        <br></br>
        <Typography
          variant="body1"
          gutterBottom
          sx={{
            backgroundColor: "rgba(241, 236, 227, 1)",
            display: "inline-block",
            padding: "0.3rem",
            opacity: "0.9",
            borderRadius: "8px",
            marginLeft: "0.3rem",
          }}
        >
          <strong>Description:</strong>
        </Typography>
        <br></br>
        <Typography
          variant="body1"
          gutterBottom
          sx={{
            backgroundColor: "rgba(241, 236, 227, 1)",
            display: "inline-block",
            padding: "0.3rem",
            opacity: "0.9",
            borderRadius: "8px",
            marginLeft: "0.3rem",
          }}
        >
          {description}
        </Typography>
        <br></br>
      </Box>

      <Button
        variant="contained"
        onClick={() => handleClickOpen()}
        sx={{ margin: "0.3rem" }}
      >
        delete post
      </Button>
      <br />
      <audio controls={true} src={audio_link} controlsList="nodownload"></audio>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        sx={{ backgroundColor: "#e8431e" }}
      >
        <DialogTitle>{"Are You Sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <strong>Deleting</strong> this minicast is a{" "}
            <strong>permanent</strong> action and cannot be undone!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDeletePost}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );

  return <>{renderedArticle}</>;
}

export default DashCastItem;
