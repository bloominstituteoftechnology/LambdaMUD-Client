import React from "react";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import DoneIcon from "@material-ui/icons/Done";

const styles = theme => ({
  root: {
    height: "100%",
  },
  listBox: {
    height: "80%",
    overflowY: "scroll"
  },
  inputField: {
    width: "90%",
    height: '10%'
  },
  btn: {
    width: "5%",
    marginTop: "12px",
    height: "20px"
  }
});

const ChatBox = ({
  classes: { root, inputField, listBox, btn },
  messages,
  change,
  submit,
  command
}) => {
  return (
    <div className={root}>
      <form onSubmit={submit}>
        <TextField
          className={inputField}
          onChange={change}
          name="command"
          placeholder="Enter command..."
          margin="normal"
          value={command}
        />
        <Button type="submit" variant="contained" className={btn} color="primary">
          <DoneIcon />
        </Button>
      </form>
      <List className={listBox}>
        {messages.map(message => {
          return (
            <ListItem key={message.id}>
              <ListItemText primary={message.message} />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default withStyles(styles)(ChatBox);
