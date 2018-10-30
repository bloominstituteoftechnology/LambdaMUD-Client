import React, { Component } from "react";

class RegisterPage extends Component {
  state = {
    username: "",
    password: "",
    confirmPassword: ""
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
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
          value={this.state.password}
          name="password"
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
          value={this.state.password}
          name="confirmPassword"
        />
        <br />
        <button className = "web-btn">
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
