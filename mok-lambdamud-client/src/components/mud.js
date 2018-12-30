import React, { Component } from "react";
import axios from "axios";
import Pusher from "pusher-js";
import { Link } from "react-router-dom";

class MUD extends Component { 
  constructor() {
    super();
    this.state = {
      room: null,
      key: localStorage.getItem("jwt"),
      msg: "",
      err: "",
      uuid: null,
      chat: []
    };
  }

   componentDidMount() {
    if (localStorage.getItem("jwt")) {
      // this.init();
      const headersAuth = {
        headers: { Authorization: `Token ${localStorage.getItem('jwt')}`}
      };
      axios
        .get(`https://mok-lambda-mud.herokuapp.com/api/adv/init`, headersAuth)
        .then(res => {
          this.setState({ player: res.data });
          const pusher = new Pusher('a4cca313980acecfd7bf', {
            cluster: 'us2'
        });
        const channel = pusher.subscribe(`p-channel-${res.data.uuid}`);
        channel.bind('broadcast', res => {
          const system =Object.value(res).toString();
          let message = [...this.state.message];
          message.push(system);
          this.setState({ message });
        });
    })
    .catch(error => console.log("error CDM", error));
  } else {
    this.props.history.push('/api/adv/init');
  }
}

   handleInput = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };
   init = () => {
    const header = {
      Authorization: `Token ${this.state.key}`
    };
    axios
      .get("https://mok-lambda-mud.herokuapp.com/api/adv/init/", { headers: header })
      .then(response => {
        this.setState({ room: response.data });
        this.setState({ uuid: response.data.uuid });
        this.pusher();
      })
      .catch(error => {
        console.log(error.response);
      });
  };

   move = direction => {
    const header = {
      Authorization: `Token ${this.state.key}`,
      "Content-Type": "application/json"
    };
    axios
      .post(
        "https://mok-lambda-mud.herokuapp.com/api/adv/move/",
        { direction: direction },
        { headers: header }
      )
      .then(response => {
        this.setState({ room: response.data });
      })
      .catch(error => {
        alert(error.response.data.error);
      });
  };
   say = msg => {
    const header = {
      Authorization: `Token ${this.state.key}`,
      "Content-Type": "application/json"
    };
    axios
      .post(
        "https://mok-lambda-mud.herokuapp.com/api/adv/say/",
        { message: msg },
        { headers: header }
      )
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error.response)
        alert("There's no one to display your message to.");
      });
      this.setState({msg: ""})
  };
   render() {
    return (
      <div>
        <Link to="/">
            <div onClick={() => localStorage.clear()} className="logout">
                Logout
            </div>
        </Link>
        {this.state.room ? (
          <div className="game">
          <div className="location">Location:
        </div>
            <p className="player">
              In this room: {this.state.room.name}
              {this.state.room.players.map(player => `, ${player}`)}
            </p>
            <p>{this.state.room.title}</p>
            <p>{this.state.room.description}</p>
            <div className="directions">
          <div onClick={() => this.move("n")}>
            North
          </div>
          <div onClick={() => this.move("e")}>
            East
          </div>
          <div onClick={() => this.move("s")}>
            South
          </div>
          <div onClick={() => this.move("w")}>
            West
          </div>
        </div>
        <div>
              <span>{this.state.room.name}:</span>{" "}
              <input
                value = {this.state.msg}
                onChange={this.handleInput}
                id="msg"
                placeholder="Enter message"
              />
              <button type="submit" onClick={() => this.say(this.state.msg)}>
                Enter
              </button>
            </div>
        </div>
        ) : localStorage.getItem("key") ? (
          <p>loading...</p>
        ) : (
        <Link to = "/">
          <p className= "login-text">Sign In or Sign Up</p>
        </Link> )}
      </div>
    );
  }
}
export default MUD; 
