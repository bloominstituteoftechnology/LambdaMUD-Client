import React, { Component } from "react";
import Axios from 'axios';

const host = 'https://stefarg-lambdamud.herokuapp.com'
class Login extends Component {
    constructor() {
        super();
        this.state = {
          username: "",
          password: ""
        };
      }

      handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
      };
    
      register = e => {
        
        e.preventDefault();
        Axios.post(`${host}/api/login/`, this.state).then(
          console.log("login"),
          this.setState({
            username: "",
            password: ""
          })
        )
      }

    render() {
    return (
        <form onSubmit={this.register}>
        <input
          onChange={this.handleInputChange}
          placeholder="username"
          value={this.state.username}
          name="username"
        />
        <input
          onChange={this.handleInputChange}
          placeholder="Password"
          value={this.state.password}
          name="password"
        />
        <button type="submit">Submit</button>
      </form>
    )
}

}
export default Login;