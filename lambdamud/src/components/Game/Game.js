import React, { Component } from "react";
import Authenticate from "../Auth/Authenticate";
import { Redirect } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Pusher from "pusher-js";

const UserDiv = styled.div`
  background-color: dodgerblue;
  width: 400px;
  margin: 0 auto;
  border-radius: 3px;
  color: white;
  h4 {
    font-weight: bold;
  }
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
`;

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: {
        uuid: "",
        name: "",
        title: "",
        description: "",
        players: [],
        error_msg: ""
      },
      direction: "",
      chatbox: [],
      msg: "",
      uuid2: ""
    };
  }
  componentDidMount() {
    this.init();
  }
  pusher = () => {
    const pusher = new Pusher("7f811ce75c6a44e0a7ed", {
      cluster: "us2"
    });
    const channel = pusher.subscribe(`p-channel-${this.state.player.uuid}`);
    // console.log("this.state", this.state);
    // const chatsox = this.state.chatbox.splice();
    // console.log("chatsox:", chatsox);
    // this.setState({
    //   chatbox: chatsox
    // });

    channel.bind("broadcast", (data) => {
      this.setState({ chatbox: [...this.state.chatbox, data.message] });
      //   alert(data.message);
    });

    Pusher.logToConsole = true;
  };

  init = () => {
    const URL = "https://arejay-lambdamud.herokuapp.com/";

    axios
      .get("https://arejay-lambdamud.herokuapp.com/api/adv/init/", {
        headers: {
          Authorization: localStorage.getItem("Authorization")
        }
      })
      .then(response => {
        this.setState({
          player: response.data,
          uuid2: response.data.uuid
        });
        this.pusher();
      })
      .catch(err => console.log(err.response));
    console.log("we made it ");
  };

  move = e => {
    e.preventDefault();
    console.log(localStorage.getItem("Authorization"));
    console.log(this.state.direction);
    axios
      .post(
        "https://arejay-lambdamud.herokuapp.com/api/adv/move/",
        { direction: this.state.direction },
        {
          headers: {
            Authorization: localStorage.getItem("Authorization")
          }
        }
      )
      .then(response => {
        console.log(response.data);
        this.setState({
          player: response.data,
          direction: ""
        });
        // if (response.data.error_msg) {F
        //   return <UserDiv>{response.data.error_msg}</UserDiv>;
        // }
      })
      .catch(err => err.response);
  };
  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  say = e => {
    e.preventDefault();
    const newMessage = this.state.msg;
    console.log(localStorage.getItem("Authorization"));
    axios
      .post(
        "https://arejay-lambdamud.herokuapp.com/api/adv/say/",
        { message: this.state.msg },
        {
          headers: {
            Authorization: localStorage.getItem("Authorization")
          }
        }
      )
      .then(response => {
        console.log(response.data);
        this.setState({
          msg: "",
          chatbox: [...this.state.chatbox, newMessage]
        });
        // if (response.data.error_msg) {F
        //   return <UserDiv>{response.data.error_msg}</UserDiv>;
        // }
      })
      .catch(err => err.response);
  };
  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    // if token doesn't exist
    //  redirect to login go fuck yourself <Redirect />
    // else
    //  continue to render game component <div>blahblah</div>
    console.log("this.props.location:", this.props.location);
    const location = this.props.location;
    if (!localStorage.getItem("Authorization")) {
      return <Redirect to="/login" />;
    } else {
      return (
        <div>
          <UserDiv>
            <h4>User</h4>
            {this.state.player.name}
          </UserDiv>
          <UserDiv>
            <h4>Location</h4>
            {this.state.player.title}
            <p>{this.state.player.description}</p>
          </UserDiv>
          <UserDiv>
            <h4>Players</h4>
            <ul>
              {this.state.player.players.map(player => (
                <li>{player}</li>
              ))}
            </ul>
          </UserDiv>
          <UserDiv>
            <h4>Errors</h4>
            {this.state.player.error_msg}
          </UserDiv>
          <UserDiv>
            <h4>Enter the direction you wish to move</h4>
            <form onSubmit={this.move}>
              <input
                onChange={this.handleInputChange}
                placeholder="n, w, s, e"
                name="direction"
                value={this.state.direction}
              />
              <button>></button>
            </form>
          </UserDiv>
          <UserDiv>
            <h4>Chatbox</h4>
            <ul>
              {this.state.chatbox.map(msg => (
                <li>{msg}</li>
              ))}
            </ul>
          </UserDiv>
          <UserDiv>
            <h4>Speak</h4>
            <form onSubmit={this.say}>
              <input
                onChange={this.handleInputChange}
                placeholder="Say Something"
                name="msg"
                value={this.state.msg}
              />
              <button>></button>
            </form>
          </UserDiv>
        </div>
      );
    }
  }
}

export default Game;
