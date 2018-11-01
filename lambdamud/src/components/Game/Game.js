import React, { Component } from "react";
import Authenticate from "../Auth/Authenticate";
import { Redirect } from "react-router-dom";
import axios from "axios";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: {
        name: "",
        title: "",
        description: ""
      }
    };
  }
  componentDidMount() {
    this.init();
  }
  init = () => {
    const URL = "https://arejay-lambdamud.herokuapp.com/";

    axios
      .get("https://arejay-lambdamud.herokuapp.com/api/adv/init/", {
        headers: {
          "Authorization": localStorage.getItem("Authorization")
        }
      })
      .then(response => {
        this.setState({ player: response.data });
      })
      .catch(err => console.log(err.response));
    console.log("we made it ");
  };

  render() {
    // if token doesn't exist
    //  redirect to login go fuck yourself <Redirect />
    // else
    //  continue to render game component <div>blahblah</div>
    console.log("this.props.location:", this.props.location);
    const location = this.props.location;
    if (!localStorage.getItem("Authorization")) {
      return <Redirect to="/login" />;
    } else {
      return <div>{this.state.player.name}</div>;
    }
  }
}

export default Game;
