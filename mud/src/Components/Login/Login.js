import React from "react";
import axios from "axios";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }
  handleInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submit = () => {
    let user = { username: this.state.username, password: this.state.password };

    axios
      .post(`https://tomprojectweekmudserver.herokuapp.com/api/login/`, user)
      .then(response => {
        console.log(response);
        console.log(response.data.key)
        localStorage.setItem("token", response.data.key)
        window.location.reload()
      })
      .catch(err => {
        console.log(err);
      }); 
      };
  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="username"
          onChange={this.handleInput}
          value={this.state.username}
          name="username"
        />
        <input
          type="text"
          placeholder="password"
          onChange={this.handleInput}
          value={this.state.password}
          name="password"
        />
        <button onClick={this.submit}>Login</button>
      </div>
    );
  }
}

export default Login;
