import React from "react";
import Landing from "./Components/Landing";
import NavBar from "./Components/NavBar";
import Login from "./Components/Login";
import ChatBox from "./Components/ChatBox";
import Dungeon from "./Components/Dungeon";
import RoomInfo from "./Components/RoomInfo";
import Commands from "./Components/Commands";
import { CssBaseline, Container } from "@material-ui/core";
import axios from "axios";

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
      <div>
        <CssBaseline />
        <NavBar logout={this.logout} loggedIn={this.state.loggedIn} />
        {!this.state.loggedIn ? (
          <Login login={this.login} />
        ) : (
          <Container>
            <Dungeon />
            <ChatBox />
            <Commands />
            <RoomInfo logout={this.logout} currentRoom={this.state.currentRoom} />
          </Container>
        )}
      </div>
    );
  }
}

export default App;
