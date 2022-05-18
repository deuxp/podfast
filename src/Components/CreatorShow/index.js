import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import ButtonBase from "@mui/material/ButtonBase";
import { styled } from "@mui/material/styles";
import { UserContext } from "../../App";
import { useContext, useEffect } from "react";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

function CreatorShow() {
  // for testing - viewable user should be passed in as a prop
  const user = useContext(UserContext);

  useEffect(() => {
    console.log("\t\tuser object ", user);
  }, []);

  const date = Date(user.created_at);

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          p: 2,
          margin: "auto",
          maxWidth: 700,
          flexGrow: 1,
          ml: "55px",
          mr: "16px",
          mt: 1,
          backgroundColor: "rgba(208, 179, 255, 1)",
        }}
      >
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase sx={{ width: 128, height: 128 }}>
              <Img
                alt="Avatar"
                src={user.avatar_link}
                sx={{
                  transform: "scale(4)",
                  borderRadius: "30px",
                  border: "solid #6811d8",
                }}
              />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1" component="div">
                  {`${user.first_name} ${user.last_name}`}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  @{user.handle}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Creator since {date}
                </Typography>
              </Grid>
              <Grid item>
                <Typography sx={{ cursor: "pointer" }} variant="body2">
                  {user.about_me}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

export default CreatorShow;
