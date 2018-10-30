import React, { Component } from "react";
import {registerUser} from './server/fetch'
class RegisterPage extends Component {
  state = {
    username: "",
    password1: "",
    password2: ""
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }; 

  resetFields = () => {
      this.setState({username: "", password1: "", password2: ""})
  }

  handleRegister = () => {
      const username = this.state.username.slice()
      const password1 = this.state.password1.slice()
      const password2 = this.state.password2.slice()
      if (username.length < 1){
          alert("Please enter a valid username.")
          this.resetFields()
      }
      if (password1.length < 6){
          alert("Please create a password. minumum 6 characters")
          this.resetFields()
      }
      if (password1 !== password2){
          alert("Password confirmation doesn't match.")
          this.resetFields()
      }
      if(username.length > 1 && password1.length > 5 && password1 === password2){
          registerUser({username, password1, password2})
      }
  }
  render() {
    return (
      <div>
        <div className="title-input mb-1">
          <span className="char1 title-first">U</span>
          <span className="char2 title-second">s</span>
          <span className="char3 title-third">e</span>
          <span className="char4 title-first">r</span>
          <span className="char5 title-second">N</span>
          <span className="char1 title-first">a</span>
          <span className="char2 title-second">m</span>
          <span className="char3 title-third">e</span>
        </div>
        <input
          onChange={this.handleChange}
          className="input-box"
          placeholder="Select Username"
          type="text"
          value={this.state.username}
          name="username"
        />
        <div className="title-input">
          <span className="char1 title-first">P</span>
          <span className="char2 title-second">a</span>
          <span className="char3 title-third">s</span>
          <span className="char4 title-first">s</span>
          <span className="char5 title-second">w</span>
          <span className="char1 title-first">o</span>
          <span className="char2 title-second">r</span>
          <span className="char3 title-third">d</span>
        </div>
        <input
          onChange={this.handleChange}
          className="input-box"
          type="password"
          placeholder="Choose Password"
          value={this.state.password1}
          name="password1"
        />
        <div className="title-input">
          <span className="char2 title-second">C</span>
          <span className="char3 title-third">o</span>
          <span className="char4 title-first">n</span>
          <span className="char5 title-second">f</span>
          <span className="char1 title-first">i</span>
          <span className="char2 title-second">r</span>
          <span className="char3 title-third">m</span>
          <span className="char1 title-first">P</span>
          <span className="char2 title-second">a</span>
          <span className="char3 title-third">s</span>
          <span className="char4 title-first">s</span>
          <span className="char5 title-second">w</span>
          <span className="char1 title-first">o</span>
          <span className="char2 title-second">r</span>
          <span className="char3 title-third">d</span>
        </div>
        <input
          onChange={this.handleChange}
          className = "input-box"
          type="password"
          placeholder="Retype Password"
          value={this.state.password2}
          name="password2"
        />
        <br />
        <button onClick = {this.handleRegister} className = "web-btn">
          <span className="char1 title-first">S</span>
          <span className="char2 title-second">u</span>
          <span className="char3 title-third">b</span>
          <span className="char4 title-first">m</span>
          <span className="char5 title-second">i</span>
          <span className="char1 title-first">t</span>
        </button>
      </div>
    );
  }
}

export default RegisterPage;
