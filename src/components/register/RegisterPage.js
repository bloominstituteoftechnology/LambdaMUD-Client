import React, { Component } from "react";
import axios from "axios";
import "./registerpage.css";

/* class register allows a user to create an account. 
   upon creation a key will be stored granting a new user access to the adventure. */

 class RegisterPage extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      password2: "",
      welcome: true,
      register: false
    };
  }
   handleInput = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };
  register = (username, password, password2) => {
    axios
      .post("https://mudlambdahuthman.herokuapp.com/api/registration/", {
        username: username,
        password1: password,
        password2: password2
      })
      .then(response => {
        localStorage.setItem("key", response.data.key);
        this.props.history.push('/adventure')
      })
      .catch(error => {
        alert(error.response.data.error);
      });
  };
  
   render() {
    return (
      <div className="registerpage">
          <input
            onChange={this.handleInput}
            id="username"
            placeholder="Username"
          />
          <input
            onChange={this.handleInput}
            id="password"
            placeholder="Password"
          />
          <input
            onChange={this.handleInput}
            id="password2"
            placeholder="Confirm new password"
          />
          <button
            type="submit"
            onClick={() =>
              this.register(
                this.state.username,
                this.state.password,
                this.state.password2
              )
            }
          >
            Submit
          </button>
      </div>
    );
  }
}
 export default RegisterPage;