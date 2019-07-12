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
        Authorization: ""
      }
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('Authorization');
    this.content.headers.Authorization = "Token " + token
    if (token) {
      this.setState({ loggedIn: true });
    } else {
      this.setState({ loggedIn: false });
    }
  }

  componentDidUpdate() {
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

  login = () => {
    if (localStorage.getItem("Authorization")) {
      this.setState({loggedIn: true})
    }
  }

  logout = () => {
    localStorage.removeItem('Authorization');
    this.setState({loggedIn: false})
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
            <RoomInfo logout={this.logout} currentRoom={this.state.currentRoom} />
          </Container>
        )} */}
      </div>
    );
  }
}

export default withRouter(App);
