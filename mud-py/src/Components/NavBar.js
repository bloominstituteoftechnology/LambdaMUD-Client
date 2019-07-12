import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Link } from "@material-ui/core";
import pyman_logo from "../assets/pyman_logo@2x.png";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  button: {
    fontFamily: "Chakra Petch",
    fontSize: "18px",
    display: "flex",
    justifyContent: "flex-end",
    marginLeft: "20px"
  },
  title: {
    flexGrow: 1
  }
}));

function NavBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" title={pyman_logo}>
        <Toolbar>
          <div className={classes.title}>
            <Link component={RouterLink} to="/">
              <img
                src={pyman_logo}
                alt="PY-MAN logo"
                height="auto"
                width="200px"
              />
            </Link>
          </div>
          <Link
            component={RouterLink}
            to="/about"
            style={{ textDecoration: "none" }}
            color="secondary"
            className={classes.button}
          >
            About
          </Link>
          <Link
            component={RouterLink}
            to="/login"
            style={{ textDecoration: "none" }}
            color="secondary"
            // onClick={props.tempChangeLogin}
            className={classes.button}
          >
            Login
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
