import React from 'react';
import axios from 'axios';

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
    e.preventDefault();
    if (this.state.username === '' || this.state.password1 === '' || this.state.password2 === '') {
      alert('Please enter credentials!');
      return;
    }
    const user = { 
      username: this.state.username, 
      password1: this.state.password1, 
      password2: this.state.password2 
    };

    axios
      .post('https://adventure-.herokuapp.com/api/registration', user)
      .then(response => {
        const token = response.data;
        localStorage.setItem('key', token)
        alert('Success!');
      })
      .catch(err => {
        console.log('Axios Failed')
      });
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