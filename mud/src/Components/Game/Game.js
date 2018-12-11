import React from "react";
import axios from "axios";
import Pusher from "pusher-js";
import PlayersInRoom from "./PlayersInRoom";

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
    };
  }
  componentDidMount() {
    this.updateState();
  }
  updateState() {
    const authtoken = localStorage.getItem("token");
    const headerinfo = {
      Authorization: `Token ${authtoken}`
    };

    axios
      .get(`https://tomprojectweekmudserver.herokuapp.com/api/adv/init/`, {
        headers: headerinfo
      })
      .then(response => {
        console.log(response);

        this.setState({
          uuid: response.data.uuid,
          name: response.data.name,
          location: response.data.title,
          description: response.data.description,
          players: response.data.players,
          occupants: response.data.players.length
        });
        console.log(this.state);
        const channel = pusher.subscribe(`p-channel-${this.state.uuid}`);
        channel.bind("broadcast", function(data) {
          console.log("jsondata", JSON.stringify(data));
          console.log("responsedata", response.data);
        });
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
          players: response.data.players
        });
      })
      .catch(err => {
        console.log(err);
      });
    this.setState({ move: "" });
  };

  broadcast = () => {
    const authtoken = localStorage.getItem("token");
    const authinfo = {
      Authorization: `Token ${authtoken}`
    };
    axios
    .post(`https://tomprojectweekmudserver.herokuapp.com/api/adv/broadcast/`, authinfo)
    .then(room => {
      console.log(room)
    })
    .catch(err => {
      console.log(err)
    })
  }

  render() {
    return (
      <div>
        <h2>
          {this.state.name} you are currently at the {this.state.location}.{" "}
          {this.state.description}
        </h2>
        <PlayersInRoom
          occupants={this.state.occupants}
          players={this.state.players}
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
        value={this.state.message}
        name="message"
        />
        <button onClick={this.broadcast}>Broadcast</button>
        
      </div>
    );
  }
}

export default Game;
