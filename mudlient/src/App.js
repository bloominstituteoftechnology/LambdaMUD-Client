//this is the main mess that drives the whole app
//lib imports
import React, { Component } from "react";
import Axios from "axios";
import Pusher from "pusher-js";

//component imports
import Display from "./components/Display";
import InputBox from "./components/InputBox";

//css imports
import "./Demos.css";
import "./CRTeffect.css";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      demosInput: "",//string
      mode: "login",//only has modes login and play
      user: "anon",//stores the current user name (string)
      display: [],//array of strings (newest last)
      serverURL: process.env.REACT_APP_FARAWAY,//this makes it easy to swap out the url between local and non
      userKey: "",//for api requests, string, returned on login/register
      currentRoom: { roomName: "None", description: "None" },//holds the title and description of room the player is in (both strings)
      playerUUID: "",//string stored for pusher
      otherPlayers: []// to let the player know who else is there
    };

    //this creates the intial connection to pusher service
    this.pusher = new Pusher("4e8131f9b37fd655ae11", {
      cluster: "mt1",
      forceTLS: true
    });
  }
  //if in login mode and enter is hit you will end up here
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
  //if all the command text checks are passed, you'll end up here where the actual post request is done
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
          //Shall We Play A Game?
          this.startGame();
        });
      })
      .catch(error => {
        //there's some well written error messages
        this.addToDisplay(error.response.data.error);
      });
  };
  //if you passed the login command checks you end up here
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
            //The only winning move is not to play
            this.startGame();
          }
        );
      })
      .catch(error => {
        this.addToDisplay(error.response.data.error);
      });
  };
  //this runs the init get request, and gets the data needed for the pusher section
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
        console.log(error);
        this.addToDisplay(error.response.data.error);
      });
  };
  //this subscribes to the pusher events and prints them if needed
  pusherEvents = () => {
    let channel = this.pusher.subscribe(`p-channel-${this.state.playerUUID}`);
    channel.bind("broadcast", data => {
      this.addToDisplay(data.message);
    });
  };
  //this is where you end up if you're in play mode in set state
  gameplayHandler = () => {
    let command = this.state.demosInput.split(/\s+/);
    //this is for the say command
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
    else if (command[0] === "shout"){
      command.shift();
      const messageToSay = command.join(" ");
      const completeURL = `${this.state.serverURL}/api/adv/shout/`;
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
    else if (command[0] === "whisper"){
      command.shift();
      const targetPlayer = command.shift();
      const messageToSay = command.join(" ");
      const completeURL = `${this.state.serverURL}/api/adv/whisper/`;
      Axios({
        method: "post",
        url: completeURL,
        headers: {
          Authorization: `Token ${this.state.userKey}`
        },
        data: {
          message: messageToSay,
          player: targetPlayer
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
      this.addToDisplay('shout <MESSAGE HERE>')
      this.addToDisplay('whisper <PLAYERNAME HERE> <MESSAGE HERE>')
      this.addToDisplay('(n)orth,(e)ast,(s)outh,(w)est')
    }
    else{

    
      this.addToDisplay(this.state.demosInput)
    let lowercasedCommand = this.state.demosInput.toLowerCase();
    const directions = { north: "n", south: "s", east: "e", west: "w" };
    //to give people options
    if (lowercasedCommand in directions) {
      lowercasedCommand = directions[lowercasedCommand];
    }
    if (
      lowercasedCommand === "n" ||
      lowercasedCommand === "e" ||
      lowercasedCommand === "w" ||
      lowercasedCommand === "s"
    ) {

      //this is where the move command is phoned in
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
    else{
      this.addToDisplay('Invalid Command');

    }
  }
    this.setState(() => {
      return { demosInput: "" };
    });
  };
  //so there's just a keypress listener that runs on start up. Text boxes don't have good css theming, and yeah that's why you log in with a command and not a seperate page
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
      //this is literally every non command key on a us keyboard (sorry international, I don't think the font I'm using covers you anyway)
        if (/^[ -~]$/.test(e.key)) {
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
  //this is for post time stamps
  returnLocalTime = () => {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    });
  };
  //makes it a lot easier when you have one function that handles all the set states for you
  addToDisplay = message => {
    let newMessage = { time: this.returnLocalTime(), message: message };
    this.setState(state => {
      return { display: state.display.concat(newMessage) };
    });
  };
  //first line is that key listener (needs to be keydown so it can catch enter). Under it is just the start up messages
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
  //so I could have just made a call back that was tacked onto anyway you could recieve room info. Instead I just made it watch for changes in room and reprint each time. Time will tell if this was a bad idea
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
