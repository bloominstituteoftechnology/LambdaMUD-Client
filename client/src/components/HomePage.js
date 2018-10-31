import React, { Component } from "react";
import axios from "axios";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authorized: true,
      user: "",
      userUUID: "",
      message: "",
      direction: "",
      errors: "",
      messages: []
    };
  }

  componentDidMount = () => {
    if (!localStorage.getItem("token")) {
      this.setState({
        authorized: false
      });
      this.props.history.push("/login");
    }

    const headersAuth = {
      headers: { Authorization: `Token ${localStorage.getItem("token")}` }
    };

    axios
      .get("http://localhost:8000/api/adv/init", headersAuth)
      .then(response => {
        console.log(response.data);
        this.setState({
          user: response.data.name,
          userUUID: response.data.uuid,
          message: `${response.data.title}:
            ${response.data.description}`,
          messages: [
            ...this.state.messages,
            `${response.data.title}: ${response.data.description}`
          ]
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  inputChangeHandler = event => {
    this.setState({
      direction: event.target.value
    });
  };

  submitHandler = event => {
    const { direction, messages } = this.state;

    event.preventDefault();

    const headersAuth = {
      headers: { Authorization: `Token ${localStorage.getItem("token")}` }
    };

    if (
      direction === "e" ||
      direction === "n" ||
      direction === "w" ||
      direction === "s"
    ) {
      axios
        .post("http://localhost:8000/api/adv/move", { direction }, headersAuth)
        .then(response => {
          console.log(response.data);
          const { title, description } = response.data;
          this.setState({
            message: `${title}: ${description}`,
            messages: [
              ...messages,
              `You went ${direction}`,
              `${title}: ${description}`
            ],
            direction: ""
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  logoutHandler = () => {
    localStorage.clear();
    this.props.history.push("/login");
  };

  render() {
    return (
      <div className="game-screen">
        <h1>Welcome {this.state.user}</h1>
        {this.state.messages.map(message => {
          return (
            <div className="message">
              <p>{message}</p>
            </div>
          );
        })}
        <form onSubmit={this.submitHandler}>
          <div className="form-group" />
          <input
            className="form-control"
            value={this.state.direction}
            onChange={this.inputChangeHandler}
            type="text"
            placeholder="Enter a direction"
          />
          <button type="submit">Enter</button>
        </form>
        <div className="error">{this.state.errors}</div>
        <button onClick={this.logoutHandler}>Log out</button>
      </div>
    );
  }
}

export default HomePage;
