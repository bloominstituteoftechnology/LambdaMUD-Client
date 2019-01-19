import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Label, Input, Form, FormGroup } from 'reactstrap';


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
    e.preventDefault();
    if (this.state.username === '' || this.state.password === '') {
      alert('Please enter credentials!');
      return;
    }
    const user = { 
      username: this.state.username, 
      password: this.state.password
    };

    axios
      .post('https://adventure-.herokuapp.com/api/login', user)
      .then(response => {
        const token = response.data.key;
        console.log(response)
        localStorage.setItem('key', token)
        this.props.history.push('/api/gamestart');
        alert('Success!');
      })
      .catch(error => {
        console.log(error.response)
      });
  };

  render() {
    return (
      <Form className="GameStart">
        <FormGroup>
          <h2 className="login-text">Login</h2>
          <h7>If you have an account, please log in.</h7>
          <Input 
            type="text"
            placeholder="Username"
            name="username"
            value={this.state.username}
            onChange={this.inputChangeHandler}
          />
        </FormGroup>
        <FormGroup>
          <Input 
            type="Password"
            placeholder="password"
            name="password"
            value={this.state.password}
            onChange={this.inputChangeHandler}
          />
        </FormGroup>
        <button class="login-button" onClick={this.submitHandler}>Login</button>
        <br />
        <br />
        <h4>Not registered?</h4>
        <Link to="/api/registration">
          <button type="button" className="login-button">Create an Account</button>
        </Link>
      </Form>
    )
  }
}

export default Login;