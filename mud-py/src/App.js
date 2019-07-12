import React from "react";
import { withRouter } from "react-router";
import { Route } from "react-router-dom";
import Landing from "./Components/Landing";
import NavBar from "./Components/NavBar";
import Login from "./Components/Login";
import About from "./Components/About";
import ChatBox from "./Components/ChatBox";
import Dungeon from "./Components/Dungeon";
import RoomInfo from "./Components/RoomInfo";
import Commands from "./Components/Commands";
import { CssBaseline, Container } from "@material-ui/core";
import axios from "axios";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      currentRoom: {}
    };

    this.content = {
      headers: {
        Authorization: "Token 626a1a9d5ab38fe08f0bab5d5b75f13fb36a12d0"
      }
    };
  }

  componentDidMount() {
    axios
      .get("https://lambda-mud-test.herokuapp.com/api/adv/init/", this.content)
      .then(data => {
        this.setState({ currentRoom: data.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  tempChangeLogin = () => {
    this.setState(prev => {
      return { loggedIn: !prev.loggedIn };
    });
  };

  render() {
    return (
      <div className="App">
        <CssBaseline />
        <NavBar tempChangeLogin={this.tempChangeLogin} />
        <Route exact path="/" component={Landing} />
        <Route path="/about" component={About} />
        <Route exact path="/login" component={Login} />
        {/* {!this.state.loggedIn ? (
          <Login />
        ) : (
          <Container>
            <Dungeon />
            <ChatBox />
            <Commands />
            <RoomInfo currentRoom={this.state.currentRoom} />
          </Container>
        )} */}
      </div>
    );
  }
}

export default withRouter(App);
