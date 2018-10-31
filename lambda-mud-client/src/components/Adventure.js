import React, { Component } from "react";
import axios from "axios";
import Pusher from "pusher-js";

class Adventure extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authorized: true,
      user: "",
      UUID: "",
      message: "",
      direction: "",
      errors: "",
      messages: [],
      players: [],
      chat: ""
    };
  }

  componentDidMount = () => {
    if (!localStorage.getItem("token")) {
      this.setState({ authorized: false });
      this.props.history.push("/login");
    }

    const authHeader = {
      headers: { Authorization: `Token ${localStorage.getItem("token")}` }
    };

    axios
      .get("https://lambda-mud-dpok.herokuapp.com/api/adv/init", authHeader)
      .then(response => {
        const { title, description } = response.data;
        this.setState({
          user: response.data.name,
          UUID: response.data.uuid,
          message: `${title}: ${description}`,
          messages: [...this.state.messages, `${title}: ${description}`],
          players: response.data["players"].join(",")
        });
        var pusher = new Pusher("2fcc2022c5616f3379a9", {
          cluster: "us2"
        });
        var channel = pusher.subscribe(`p-channel-${this.state.uuid}`);
        channel.bind("broadcast", response => {
          this.setState({
            message: response.message,
            messages: [...this.state.messages, response.message]
          });
        });
      });
  };
}
