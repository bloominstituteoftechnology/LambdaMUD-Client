import React, { Component } from "react";
import "./Demos.css";
import "./CRTeffect.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      demosInput: "",
      mode: "login",
      user: "anon",
      display: []
    };
  }
  login = (user, password) => {};
  handleKeypress = e => {
    switch (e.key) {
      case "Enter":
        if (this.state === "login") {
        }
        this.setState(() => {
          return { demosInput: "" };
        });
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
      "If you don't have an account please use command => register"
    );
    this.addToDisplay(
      "Please login with command => login <username>:<password>"
    );
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
                {this.state.demosInput} <span className={this.state.demosInput !=="" ? "cursor":"cursor nochar"}>&#x25AC;</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
