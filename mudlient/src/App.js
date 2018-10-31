import React, { Component } from "react";
import "./Demos.css";
import "./CRTeffect.css";
import Axios from "axios";
import Pusher from "pusher-js";
import Display from "./components/Display";
import InputBox from "./components/InputBox";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      demosInput: "",
      mode: "login",
      user: "anon",
      display: [],
      serverURL: process.env.REACT_APP_FARAWAY,
      userKey: "",
      currentRoom: { roomName: "None", description: "None" },
      playerUUID: "",
      otherPlayers: []
    };
    this.pusher = new Pusher("4e8131f9b37fd655ae11", {
      cluster: "mt1",
      forceTLS: true
    });
  }
  userAuthHandler = () => {
    let command = this.state.demosInput.split(/\s+/);
    if (
      command[0] === "register" &&
      command.length === 2 &&
      command[1].includes(":")
    ) {
      this.addToDisplay(this.state.demosInput);
      const splitCred = command[1].split(":");
      this.registerUser(splitCred[0], splitCred[1]);
    } else if (
      command[0] === "login" &&
      command.length === 2 &&
      command[1].includes(":")
    ) {
      this.addToDisplay(this.state.demosInput);

      const splitCred = command[1].split(":");
      this.loginUser(splitCred[0], splitCred[1]);
    }
    else if (command[0]==='help'||command[0]==='h'){
      this.addToDisplay('Current Valid Commands Are:')
      this.addToDisplay('register <USERNAME>:<PASSWORD>')
      this.addToDisplay('login <USERNAME>:<PASSWORD>')
    }
    else {
      this.addToDisplay("Invalid Command");
    }
    this.setState(() => {
      return { demosInput: "" };
    });
  };
  registerUser = (username, pass) => {
    Axios({
      method: "post",
      url: `${this.state.serverURL}/api/registration/`,
      data: {
        username: username,
        password1: pass,
        password2: pass
      }
    })
      .then(response => {
        this.setState(() => {
          return {
            user: username,
            userKey: response.data.key,
            mode: "play"
          };
        },
        () => {
          this.startGame();
        });
      })
      .catch(error => {
        this.addToDisplay(error.response.data.error);
      });
  };
  loginUser = (username, pass) => {
    const completeURL = `${this.state.serverURL}/api/login/`;
    Axios({
      method: "post",
      url: completeURL,
      data: {
        username: username,
        password: pass
      }
    })
      .then(response => {
        this.setState(
          {
            user: username,
            userKey: response.data.key,
            mode: "play"
          },
          () => {
            this.startGame();
          }
        );
      })
      .catch(error => {
        this.addToDisplay(error.response.data.error);
      });
  };
  startGame = () => {
    const completeURL = `${this.state.serverURL}/api/adv/init/`;
    Axios({
      method: "get",
      url: completeURL,
      headers: {
        Authorization: `Token ${this.state.userKey}`
      }
    })
      .then(response => {
        this.setState(
          {
            currentRoom: {
              roomName: response.data.title,
              description: response.data.description
            },
            playerUUID: response.data.uuid,
            otherPlayers: response.data.players
          },
          () => {
            this.pusherEvents();
          }
        );
      })
      .catch(error => {
        this.addToDisplay(error.response.data.error);
      });
  };
  pusherEvents = () => {
    let channel = this.pusher.subscribe(`p-channel-${this.state.playerUUID}`);
    channel.bind("broadcast", data => {
      this.addToDisplay(data.message);
    });
  };
  gameplayHandler = () => {
    let command = this.state.demosInput.split(/\s+/);
    console.log(command);
    if (command[0].toLowerCase() === "say") {
      command.shift();
      const messageToSay = command.join(" ");
      const completeURL = `${this.state.serverURL}/api/adv/say/`;
      Axios({
        method: "post",
        url: completeURL,
        headers: {
          Authorization: `Token ${this.state.userKey}`
        },
        data: {
          message: messageToSay
        }
      })
        .then(response => {
          this.addToDisplay(response.data.message);
        })
        .catch(error => {
          this.addToDisplay(error.response.data.error);
        });
    }
    else if (command[0]==='help'||command[0]==='h'){
      this.addToDisplay('Current Valid Commands Are:')
      this.addToDisplay('say <MESSAGE HERE>')
      this.addToDisplay('(n)orth, (e)ast,(s)outh,(w)est')
    }

    let lowercasedCommand = this.state.demosInput.toLowerCase();
    const directions = { north: "n", south: "s", east: "e", west: "w" };
    if (lowercasedCommand in directions) {
      lowercasedCommand = directions[lowercasedCommand];
    }
    if (
      lowercasedCommand === "n" ||
      lowercasedCommand === "e" ||
      lowercasedCommand === "w" ||
      lowercasedCommand === "s"
    ) {
      const completeURL = `${this.state.serverURL}/api/adv/move/`;
      Axios({
        method: "post",
        url: completeURL,
        headers: {
          Authorization: `Token ${this.state.userKey}`
        },
        data: {
          direction: lowercasedCommand
        }
      })
        .then(response => {
          if (response.data.error_msg.length > 0) {
            this.addToDisplay(response.data.error_msg);
          } else {
            this.setState({
              currentRoom: {
                roomName: response.data.title,
                description: response.data.description
              },
              otherPlayers: response.data.players,
              demosInput: ""
            });
          }
        })
        .catch(error => {
          this.addToDisplay(error.response.data.error);
        });
    }
    this.setState(() => {
      return { demosInput: "" };
    });
  };
  handleKeypress = e => {
    switch (e.key) {
      case "Enter":
        if (this.state.mode === "login") {
          this.userAuthHandler();
        } else if (this.state.mode === "play") {
          this.gameplayHandler();
        }
        break;
      case "Backspace":
        this.setState(prevState => {
          return { demosInput: prevState.demosInput.slice(0, -1) };
        });
        break;
      default:
        if (/^[\w-\s!@#$%^&*()-=_+|;':",.<>?]$/.test(e.key)) {
          this.setState(prevState => {
            if (e.code === "Space") {
              return { demosInput: prevState.demosInput.concat("\xa0") };
            }
            return { demosInput: prevState.demosInput.concat(e.key) };
          });
        }
        break;
    }
  };
  returnLocalTime = () => {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    });
  };
  addToDisplay = message => {
    let newMessage = { time: this.returnLocalTime(), message: message };
    this.setState(state => {
      return { display: state.display.concat(newMessage) };
    });
  };
  componentDidMount = () => {
    document.addEventListener("keydown", this.handleKeypress);
    this.addToDisplay(
      "If you don't have an account please use command => register <username>:<password>"
    );
    this.addToDisplay(
      "Please login with command => login <username>:<password>"
    );
    this.addToDisplay(
      "(h)elp at anytime will tell you a current command list"
    );
    Pusher.logToConsole = true;
  };
  componentDidUpdate(prevProps, prevState) {
    // Typical usage (don't forget to compare props):
    if (this.state.currentRoom.roomName !== prevState.currentRoom.roomName) {
      this.addToDisplay(`You're in ${this.state.currentRoom.roomName}.`);
      this.addToDisplay(`${this.state.currentRoom.description}`);
      if (this.state.otherPlayers.length !== 0) {
        this.addToDisplay(
          `Looking around you see ${this.state.otherPlayers.join()}`
        );
      }
    }
  }
  render() {
    return (
      <div className="crt">
        <div className="demoContainer">
          <div className="demoSelectTitle">MUDDIN</div>
          <Display display={this.state.display}/>
          <InputBox user={this.state.user} demosInput={this.state.demosInput}/>
        </div>
      </div>
    );
  }
}

export default App;
