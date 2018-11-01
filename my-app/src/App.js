import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";

import Register from "./components/register/Register";
import Login from "./components/login/Login";
import Home from "./components/home/Home";
import { Grid, Input, Button, Line, PageContainer, TerminalContainer  } from "./components/global-styles/Global";

// not implemented yet
import Game from "./components/game/Game";

class App extends Component {
  render() {
    return (
      <PageContainer>
        <TerminalContainer>
          <Grid col3>
            <Link to="/register">
              <Button nav>Register</Button>
            </Link>
            <Link to="/login">
              <Button nav>Login</Button>
            </Link>
            <Link to="/">
              <Button nav>Play the game!</Button>
            </Link>
          </Grid>
          <Line />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </TerminalContainer>
      </PageContainer>
    );
  }
}
export default App;
