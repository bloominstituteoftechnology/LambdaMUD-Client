import React from "react";
import axios from "axios";

class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
      players: ""
    };
  }
  componentDidMount() {
    let token = localStorage.getItem("token").slice(1, -1);
    const authHeader = {
      headers: {
        Authorization: "Token " + token
      }
    };
    console.log("authHeader is: ", authHeader);
    axios
      .get("https://nicky-adventuregame.herokuapp.com/api/adv/init/", authHeader)
      .then(response => {
        this.setState({ title: response.data.title, description: response.data.description });
        console.log("title is: ", this.state.title);
      })
      .catch(err => {
        console.log(err.message);
      });
  }

  render() {
    return (
      <div>
        <p>North of you, the cave mount beckons</p>
      </div>
    );
  }
}

export default HomePage;
