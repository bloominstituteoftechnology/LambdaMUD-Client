import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from '@material-ui/core/Typography';

const Titlebar = props => {
  return (
    <div style={{flexGrow: 1}}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            LambdaMUD - JS
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Titlebar;
