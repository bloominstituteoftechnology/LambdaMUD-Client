import React from "react";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
});

const RoomDetails = ({ classes: { root }, title, description }) => {
  return (
    <div className={root}>
      <Typography variant="headline" gutterBottom>
        Current Room:
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary="Room Title: " />
        </ListItem>
        <ListItem>
          <ListItemText inset primary={title} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Room Description: " />
        </ListItem>
        <ListItem>
          <ListItemText inset primary={description} />
        </ListItem>
      </List>
    </div>
  );
};

export default withStyles(styles)(RoomDetails);
