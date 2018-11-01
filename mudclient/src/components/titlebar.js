import React from "react";
import { withRouter } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const logout = history => {
  localStorage.removeItem("js-lambdamud");
  history.push("/login");
};

const Titlebar = props => {
  return (
    <div style={{ flexGrow: 1, width: "100%" }}>
      <AppBar position="static" style={{ width: "100%", padding: "0 15px" }}>
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={3}>
            <Toolbar>
              <Typography variant="h6" color="inherit">
                LambdaMUD - JS
              </Typography>
            </Toolbar>
          </Grid>
          <Grid item xs={1}>
            {localStorage.getItem("js-lambdamud") && (
              <Button
                onClick={() => logout(props.history)}
                variant="contained"
                color="secondary"
              >
                Logout
              </Button>
            )}
          </Grid>
        </Grid>
      </AppBar>
    </div>
  );
};

export default withRouter(Titlebar);
