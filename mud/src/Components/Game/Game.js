import React from "react";
import axios from "axios";
import Pusher from "pusher-js";
import PlayersInRoom from "./PlayersInRoom";
import PusherDiv from "./Pusher";

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
      displaymessage: "",
    };
  }

  componentDidMount() {
    const authtoken = localStorage.getItem("token");
    const headerinfo = {
      Authorization: `Token ${authtoken}`
    };

    axios
      .get(`http://127.0.0.1:8000/api/adv/init/`, {
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
              console.log(displaymessage)
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
      .post(`http://127.0.0.1:8000/api/adv/move/`, data, { headers: authinfo })
      .then(response => {
        console.log(response);
        this.setState({
          uuid: response.data.uuid,
          name: response.data.name,
          location: response.data.title,
          description: response.data.description,
          players: response.data.players,
          displaymessage: '',
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
    this.setState({saymessage: ''})
    axios
      .post(`http://127.0.0.1:8000/api/adv/say/`, data, { headers: authinfo })
      .then(response => {
        console.log(response)
        return this.setState({
          displaymessage: response.data.saidmessage
        }, 
        ()=> {
          console.log('state as defined in say below')
          console.log(this.state)
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  
  broadcast = () => {
    const authtoken = localStorage.getItem("token");
    const authinfo = { Authorization: `Token ${authtoken}` };
    const data = { saidmessage: this.state.saymessage };
    this.setState({saymessage: ''})
    axios
      .post(`http://127.0.0.1:8000/api/adv/broadcast/`, data, { headers: authinfo })
      .then(response => {
        console.log(response)
        return this.setState({
          displaymessage: response.data.saidmessage
        }, 
        ()=> {
          console.log('state as defined in say below')
          console.log(this.state)
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    return (
      <div>
        <h2>
          {this.state.name} you are currently at the {this.state.location}.{" "}
          {this.state.description}
        </h2>
        {/* <PlayersInRoom
          occupants={this.state.occupants}
          players={this.state.players}
        /> */}
        <PusherDiv
          props="props"
          displaymessage={this.state.displaymessage} 
        />
        <input
          type="text"
          placeholder="Type your move here"
          onChange={this.handleInput}
          value={this.state.move}
          name="move"
        />
        <button onClick={this.submit}>Submit</button>
        <input
          type="text"
          placeholder="Type your message here"
          onChange={this.handleInput}
          value={this.state.saymessage}
          name="saymessage"
        />
        <button onClick={this.say}>say</button>
        <button onClick={this.broadcast}>broadcast</button>
      </div>
    );
  }
}

export default Game;
