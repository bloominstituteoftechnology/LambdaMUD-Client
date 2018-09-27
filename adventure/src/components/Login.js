import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Label, Input, Form, FormGroup } from 'reactstrap';


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
          <h2>Login Below</h2>
          <Label for="exampleEmail">Username</Label>
          <Input 
            type="text"
            placeholder="username"
            name="username"
            value={this.state.username}
            onChange={this.inputChangeHandler}
          />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input 
            type="password"
            placeholder="password"
            name="password"
            value={this.state.password}
            onChange={this.inputChangeHandler}
          />
        </FormGroup>
        <Button color="primary" onClick={this.submitHandler}>Login</Button>
        <br />
        <br />
        <Link to="/api/registration">Don't have an account?</Link>
      </Form>
    )
  }
}

export default Login;