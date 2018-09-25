import React from 'react';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password1: "",
      password2: ""
    };
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value});
  };

  handleRegisterSubmit = e => {
    const user = this.state.username;
    localStorage.setItem("user", user);
    window.location.reload();
  };

  render() {
    return (
      <form className="register_form">
        <h2>Register Below</h2>
        <input 
          type="text"
          placeholder="username"
          name="username"
          value={this.state.username}
          onChange={this.handleInputChange}
        />
        <input 
          type="password"
          placeholder="password"
          name="password"
          value={this.state.password}
          onChange={this.handleInputChange}
        />
        <button onClick={this.handleRegisterSubmit}>Register</button>
      </form>
    )
  }
}

export default Register;