import React, { Component } from "react";
import axios from "axios";

class Main extends Component {
  state = {
    users: []
  };
  render() {
    return (
      <div>
        <ul>
          {this.state.users.map(user => (
            <div>
              <li key={user.name} />
              <li key={user.title} />
              <li key={user.description} />
              <li key={user.players} />
              <br />
            </div>
          ))}
        </ul>
      </div>
    );
  }
  componentDidMount() {
    const token = localStorage.getItem("jwt");
    const reqOptions = {
      headers: {
        Authorization: token
      }
    };
    axios
      .get("http://localhost:8000/api/adv/init/", reqOptions)
      .then(res => {
        console.log("Users Data:", res.data);
        this.setState({ users: res.data });
      })
      .catch(err => {
        console.log(err);
        this.props.history.push("/");
      });
  }
}

export default Main;
