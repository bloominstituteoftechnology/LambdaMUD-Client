import React from "react";
import axios from "axios";
import Pusher from "pusher-js";
import Chat from "./Chat";
import { Route } from "react-router-dom";
const url = "https://lambdamudvleon.herokuapp.com/api/adv/init/";

const APP_KEY = "18b8fc7f40c450c2f420";

// pusher implementation used in a component did mount 
// token needs to be there in order for the game component to render
// rendering the alerts for users that are in the rooms

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameObj: {},
      command_line: "",
      direction: "",
      archmessage: [],
      channel: null
      // token: ""
    };
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  getToken = () => {
    let token = localStorage.getItem("Token");
    return token;
  };

  componentDidMount() {
    // Make sure to streamline them together when you're done
    const token = this.getToken();
    if (token) {
      let config = {
        headers: {
          Authorization: `Token ${token}`
        }
      };
      axios
        .get(url, config)
        .then(response => {
          const pusher = new Pusher(APP_KEY, {
            cluster: "us2",
            auth: {
              params: { "content-type": "application/json" },
              headers: { authorization: `Token ${token}` }
            }
          });

          this.setState({
            gameObj: response.data,
            channel: pusher.subscribe(`p-channel-${response.data.uuid}`)
          });
          //     console.log(`channel to join: p-channel-${response.data.uuid}`);
          //   console.log(this.state.channel.name);
          this.state.channel.bind(
            "broadcast",
            data => {
              // the data parameter contains the response pusher sent back.
              // create a brand new array, somehow stick all the values from this.state.archmessage
              // push the new message to the new array
              // assign that array to archmessage in setState
              this.setState({
                archmessage: [...this.state.archmessage, data.message]
              });
              // console.log(`hi ${data.name}`); //right? -think so
              console.log(this.state.archmessage);
            },
            { archmessage: pusher }
          );
        })

        .catch(error => console.log("Error: ", error));
    }
  }

  // testing to see if function works
  // once the command works then will have to combined the userDirection and userMessage in a command_line if statement

  commands = event => {
    event.preventDefault();
  };

  userDirection = event => {
    event.preventDefault();
    const token = this.getToken();
    console.log("command_line:", this.state.command_line);
    let config = {
      headers: {
        Authorization: `Token ${token}`
      }
    };
    const direction = {
      direction: this.state.command_line
    };
    axios
      .post(
        "https://lambdamudvleon.herokuapp.com/api/adv/move/",
        direction,
        config
      )
      .then(response => {
        console.log("---success @ userDirection!:", response.data);
        this.setState({
          gameObj: response.data
        });
      });
  };

  render() {
    const { name, title, description } = this.state.gameObj;
    const archmessage = this.state.archmessage;
    return (
      <div className="game-container">
        <h1>{title}</h1>
        <p>{name}</p>
        <p>{description}</p>
        <input
          type="text"
          placeholder="send command"
          name="command_line"
          value={this.state.command_line}
          onChange={this.onChange}
        />
        <button onClick={this.userDirection}>SEND</button>
        <React.Fragment>
          <Route
            path="/"
            render={props => {
              return (
                <Chat
                  channel={this.state.channel}
                  archmessage={this.state.archmessage}
                />
              );
            }}
          />
        </React.Fragment>
      </div>
    );
  }
}
export default Game;

// this argument represents the type of event to listen to.
// if you look at your backend code, notice that the pusher.trigger sends out a 'broadcast' as the first argument
// it seems you're listening for a 'message' event though

// pusher.trigger(f'p-channel-{p_uuid}', u'broadcast', {"message":f"{player.user.username}: {message}"})
//                  name of channel         event name           data to send
