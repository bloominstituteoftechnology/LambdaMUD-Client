import React from "react";
import axios from "axios";
import Pusher from "pusher-js";
import PlayersInRoom from "./PlayersInRoom";
import PusherDiv from "./Pusher";
import styled from "styled-components";
import LambdaHeader from "../Login/Header";

const GameContainerDiv = styled.div`
  height: 100%;
  min-height: 100vh;
  width: 100%;
`;

const GameDiv = styled.div` 
height:80% 
padding: 0 20px;
width: 80%; 
margin: 0 auto;
line-height: 1.5;
`;

const StyledButton = styled.button`
  width: 12%;
  height: 10%;
  padding: 0.7% 1%;
  font-size: 0.9rem;
  font-weight: bold;
  margin-left: 2%;
`;

const StyledInputField = styled.input`
  width: auto;
  padding: 1% 1%;
  font-size: 0.9rem;
  font-weight: bold;
`;

const StyledPusherMessageDiv = styled.div`
  height: 50px;
`;

Pusher.logToConsole = true;

var pusher = new Pusher("5f338a9f01bf77f71a61", {
  cluster: "us2",
  forceTLS: true
});

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uuid: "",
      name: "",
      location: "",
      description: "",
      players: [],
      occupants: 0,
      move: "",
      message: "",
      saymessage: "",
      saidmessage: "",
      displaymessage: ""
    };
  }

  componentDidMount() {
    console.log("CDM");
    const authtoken = localStorage.getItem("token");
    const headerinfo = {
      Authorization: `Token ${authtoken}`
    };

    axios
      .get(`https://tomprojectweekmudserver.herokuapp.com/api/adv/init/`, {
        headers: headerinfo
      })
      .then(response => {
        return this.setState(
          {
            uuid: response.data.uuid,
            name: response.data.name,
            location: response.data.title,
            description: response.data.description,
            players: response.data.players,
            occupants: response.data.players.length
          },
          () => {
            var channel = pusher.subscribe(`p-channel-${this.state.uuid}`);
            channel.bind("broadcast", data => {
              console.log(data.message);
              console.log("RECEIVED BROADCAST - inside of CDM");
              const displaymessage = data.message;
              console.log(displaymessage);
              this.setState({ displaymessage: displaymessage });
              console.log("state below");
              console.log(this.state);
            });
            pusher.connection.bind("error", err => console.log(err));
            console.log(pusher);
          }
        );
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submit = () => {
    const authtoken = localStorage.getItem("token");
    const authinfo = {
      Authorization: `Token ${authtoken}`
    };
    const data = {
      direction: this.state.move
    };
    axios
      .post(
        `https://tomprojectweekmudserver.herokuapp.com/api/adv/move/`,
        data,
        { headers: authinfo }
      )
      .then(response => {
        console.log(response);
        this.setState({
          uuid: response.data.uuid,
          name: response.data.name,
          location: response.data.title,
          description: response.data.description,
          players: response.data.players,
          occupants: response.data.players.length,
          displaymessage: ""
        });
      })
      .catch(err => {
        console.log(err);
      });
    this.setState({ move: "" });
  };

  say = () => {
    const authtoken = localStorage.getItem("token");
    const authinfo = { Authorization: `Token ${authtoken}` };
    const data = { saidmessage: this.state.saymessage };
    this.setState({ saymessage: "", displaymessage: "" });
    axios
      .post(
        `https://tomprojectweekmudserver.herokuapp.com/api/adv/say/`,
        data,
        { headers: authinfo }
      )
      .then(response => {
        console.log(response);
        return this.setState(
          {
            displaymessage: response.data.saidmessage
          },
          () => {
            console.log("state as defined in say below");
            console.log(this.state);
          }
        );
      })
      .catch(err => {
        console.log(err);
      });
  };

  broadcast = () => {
    const authtoken = localStorage.getItem("token");
    const authinfo = { Authorization: `Token ${authtoken}` };
    const data = { saidmessage: this.state.saymessage };
    this.setState({ saymessage: "", displaymessage: "" });
    axios
      .post(
        `https://tomprojectweekmudserver.herokuapp.com/api/adv/broadcast/`,
        data,
        {
          headers: authinfo
        }
      )
      .then(response => {
        console.log(response);
        return this.setState(
          {
            displaymessage: response.data.saidmessage
          },
          () => {
            console.log("state as defined in say below");
            console.log(this.state);
          }
        );
      })
      .catch(err => {
        console.log(err.message);
      });
  };
  render() {
    return (
      <GameContainerDiv>
        <LambdaHeader />
        <GameDiv>
          <h2>
            {this.state.name} you are currently at the {this.state.location}.
          </h2>
          <PlayersInRoom
            occupants={this.state.occupants}
            players={this.state.players}
          />
          <h2>{this.state.description}</h2>

          <PusherDiv props="props" displaymessage={this.state.displaymessage} />

          <StyledInputField
            type="text"
            placeholder="Type your move here"
            onChange={this.handleInput}
            value={this.state.move}
            name="move"
          />
          <StyledButton onClick={this.submit}>Submit</StyledButton>
          <br />
          <br />
          <StyledInputField
            type="text"
            placeholder="Type your message here"
            onChange={this.handleInput}
            value={this.state.saymessage}
            name="saymessage"
          />
          <StyledButton onClick={this.say}>Say</StyledButton>
          <StyledButton onClick={this.broadcast}>Broadcast</StyledButton>
        </GameDiv>
      </GameContainerDiv>
    );
  }
}

export default Game;
