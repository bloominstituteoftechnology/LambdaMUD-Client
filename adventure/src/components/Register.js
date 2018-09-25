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

  inputChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value});
  };

  submitHandler = e => {
    const user = this.state.username;
    localStorage.setItem("user", user);
    this.props.history.push('/api/login')
    alert('Successfully Registered!');
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
          onChange={this.inputChangeHandler}
        />
        <br />
        <input 
          type="password"
          placeholder="password"
          name="password1"
          value={this.state.password1}
          onChange={this.inputChangeHandler}
        />
        <br />
        <input 
          type="password"
          placeholder="confirm password"
          name="password2"
          value={this.state.password2}
          onChange={this.inputChangeHandler}
        />
        <br />
        <button onClick={this.submitHandler}>Register</button>
      </form>
    )
  }
}

export default Register;