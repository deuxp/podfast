import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import ButtonBase from "@mui/material/ButtonBase";
import { styled } from "@mui/material/styles";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

function CreatorShow({ creator }) {
  const date = Date(creator.created_at);

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
          mt: 2,
          backgroundColor: "rgba(208, 179, 255, 1)",
        }}
      >
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase sx={{ width: 128, height: 128 }}>
              <Img
                alt="Avatar"
                src={creator.avatar_link}
                sx={{
                  transform: "scale(3)",
                  borderRadius: "30px",
                  maxHeight: "40px",
                  maxWidth: "40px",
                  border: "solid #6811d8",
                }}
              />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1" component="div">
                  {`${creator.first_name} ${creator.last_name}`}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  @{creator.handle}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Creator since {date}
                </Typography>
                <br />
                {creator && (
                  <>
                    <Typography variant="caption" color="text.secondary">
                      <a href={creator.twitter_link || ""}>@Twitter</a>
                    </Typography>
                    <br />
                  </>
                )}
                {creator && (
                  <Typography variant="caption" color="text.secondary">
                    <a href={creator.facebook_link || ""}>@Facebook</a>
                  </Typography>
                )}
              </Grid>
              <Grid item>
                <Typography sx={{ cursor: "pointer" }} variant="body2">
                  {creator.about_me}
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
