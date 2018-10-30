import React, { Component } from "react";
import "./Demos.css";
import "./CRTeffect.css";
import Axios from "axios";
import Pusher from "pusher-js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      demosInput: "",
      mode: "login",
      user: "anon",
      display: [],
      serverURL: "http://localhost:8000",
      userKey: "",
      currentRoom: {},
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
    if (command[0] === "register" && command.length === 2) {
      this.addToDisplay(this.state.demosInput);
      const splitCred = command[1].split(":");
      this.registerUser(splitCred[0], splitCred[1]);
    } else if (command[0] === "login" && command.length === 2) {
      this.addToDisplay(this.state.demosInput);

      const splitCred = command[1].split(":");
      this.loginUser(splitCred[0], splitCred[1]);
    } else {
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
        this.setState({
          currentRoom: {
            roomName: response.data.title,
            description: response.data.description
          },
          playerUUID: response.data.uuid,
          otherPlayers: response.data.players
        },()=>{
          this.pusherEvents();
        });
      })
      .catch(error => {
        this.addToDisplay(error.response.data.error);
      });

  };
  pusherEvents = ()=>{
    let channel = this.pusher.subscribe(`p-channel-${this.state.playerUUID}`);
    channel.bind("my-event", function(data) {
      alert(data.message);
    });
  }
  handleKeypress = e => {
    switch (e.key) {
      case "Enter":
        if (this.state.mode === "login") {
          this.userAuthHandler();
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
    Pusher.logToConsole = true;

  };
  render() {
    return (
      <div className="crt">
        <div className="demoContainer">
          <div className="demoSelectTitle">LambdaMUD</div>
          <div className="display">
            {this.state.display.map((e, i) => {
              return (
                <div key={i} className="displayLine">
                  {" "}
                  {e.time}:{e.message}{" "}
                </div>
              );
            })}
          </div>
          <div className="inputProgram">
            <div className="pcname ">
              {this.state.user}
              @LambdaMUD=>
            </div>
            <div className="inputBoxDemos">
              <span className="inputText">
                {this.state.demosInput}{" "}
                <span
                  className={
                    this.state.demosInput !== "" ? "cursor" : "cursor nochar"
                  }
                >
                  &#x25AC;
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
