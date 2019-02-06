import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import MudActions from "./MudActions";
import ScrollableFeed from "react-scrollable-feed";
import Pusher from "pusher-js";

class Mud extends React.Component {
  constructor() {
    super();
    this.state = {
      actions: [],
      action: "",
      pusher: "",
      say:"",
      move:"",
      message:"",
      displayMessage:"",
    };
  }

//   say, move, message, display the message. 

// the init starts the game once the token is gotten
  componentDidMount() {
    const token = localStorage.getItem("token");
    localStorage.setItem("savedPage", "/main");
    const pusher = new Pusher("f2e0cedb92e5b7781a93", {
      cluster: "us2"
    });
    axios
      .get("https://mud-project1.herokuapp.com/api/adv/init", {
        headers: {
          Authorization: `Token ${token}`
        }
      })
      .then(res => {
        const actions = this.state.actions.slice();
        actions.push(res.data);
        const channel = pusher.subscribe(`p-channel-${res.data.uuid}`);
        channel.bind("broadcast", function(data) {
          alert(data.message);
        });
        this.setState({ actions: actions, pusher: pusher });
      })
      .catch(err => console.log(err.response));
  }
  componentWillUnmount() {
    const pusher = this.state.pusher;
    pusher.unsubscribe(`p-channel-${this.state.actions[0].uuid}`);
  }
  logout = () => {
    localStorage.removeItem("token");
    this.props.history.push("/login");
  };
  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

//   this is to be able to input the change of directions and tried the say method in the MUD
  processAction = e => {
    e.preventDefault();
    let action = this.state.action;
    const token = localStorage.getItem("token");
    if (
      action.toLowerCase() === "n" ||
      action.toLowerCase() === "e" ||
      action.toLowerCase() === "s" ||
      action.toLowerCase() === "w"
    ) {
      this.move(action, token);
    } else {
      alert(`${action} The command you used isn't an option. Please use n for North, e for East,s for South,or w for West.`);
      this.setState({ action: "" });
    }
  };
  say = (message, token) => {
    axios
      .post(
        "https://mud-project1.herokuapp.com/api/adv/say",
        { message: `, '${message}'` },
        {
          headers: {
            Authorization: `Token ${token}`
          }
        }
      )
      .then(res => this.setState({ action: "" }))
      .catch(err => console.log(err));
  };
  move = (direction, token) => {
    axios
      .post(
        "https://mud-project1.herokuapp.com/api/adv/move",
        { direction: direction },
        {
          headers: {
            Authorization: `Token ${token}`
          }
        }
      )
      .then(res => {
        if (res.data.error_msg === "") {
          const actions = this.state.actions.slice();
          actions.push(res.data);
          this.setState({ actions: actions, action: "" });
        } else {
          alert("moving that way would not be wise...");
          this.setState({ action: "" });
        }
      })
      .catch(err => console.log(err));


  };
  render() {
    return (
      <div onSubmit={this.processAction}>

        <div>Adventure</div>

        <div>

          <div>
            <ScrollableFeed forceScroll={true}>
              {this.state.actions.length > 0
                ? this.state.actions.map((e, i) => {
                    return <MudActions data={e} key={i} />;
                  })
                : null}
            </ScrollableFeed>
          </div>

          <div>
            <input
              type="text"
              placeholder="Enter An Action."
              value={this.state.action}
              name="action"
              onChange={this.handleInputChange}
            />

            <button type="submit" onClick={this.processAction}  >
                Choose your path.
            </button>

            <button onClick={this.logout}>
                Leave your adventure!
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Mud);

