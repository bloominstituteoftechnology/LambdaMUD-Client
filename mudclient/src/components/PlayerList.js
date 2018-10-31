import React from "react";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PersonIcon from "@material-ui/icons/Person";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
});

const PlayerList = ({ players, classes: { root } }) => {
  return (
    <div className={root}>
      <Typography variant="h3" gutterBottom>
        Players in Room:
      </Typography>
      <List component="nav">
        {players.map(player => {return (
          <ListItem button>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText inset primary={`${player}`} />
          </ListItem>
        )})}
      </List>
    </div>
  );
};

export default withStyles(styles)(PlayerList);
