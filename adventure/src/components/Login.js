import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  };

  inputChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value});
  };

  submitHandler = e => {
    const user = this.state.username;
    localStorage.setItem("user", user);
    alert('Welcome User!');
  };

  render() {
    return (
      <form className="login_form">
        <h2>Login Below</h2>
        <input 
          type="text"
          placeholder="username"
          name="username"
          value={this.state.username}
          onChange={this.inputChangeHandler}
        />
        <br />
        <input 
          type="password"
          placeholder="password"
          name="password"
          value={this.state.password}
          onChange={this.inputChangeHandler}
        />
        <br />
        <button onClick={this.handleLoginSubmit}>Login</button>
      </form>
    )
  }
}

export default Login;