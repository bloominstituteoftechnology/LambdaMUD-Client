import React from 'react';
import Register from './Register';
import { Container, Typography, TextField, Button } from '@material-ui/core';
import axios from 'axios';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      register: false,
      username: '',
      password: '',
      passwordCheck: '',
      passwordValid: true,
      passwordCheckValid: true
    };
  }

  registerChange = () => {
    this.setState(prev => {
      return { register: !prev.register };
    });
  };

  changeHandler = e => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value });
  };

  loginHandler = () => {
    const { username, password } = this.state;
    axios
      .post('https://lambda-mud-test.herokuapp.com/api/login/', {
        username: username,
        password1: password
      })
      .then(data => {
        localStorage.setItem('Authorization', data.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  registrationHandler = () => {
    const { username, password, passwordCheck } = this.state;
    if (password === passwordCheck) {
      axios
        .post('https://lambda-mud-test.herokuapp.com/api/registration/', {
          username: username,
          password: password
        })
        .then(data => {
          localStorage.setItem('Authorization', data.data);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      console.log(password, passwordCheck)
      this.setState(prev => {
        return { passwordCheckValid: !prev.passwordCheckValid };
      });
    }
  };

  render() {
    const { passwordValid } = this.state;

    return (
      <Container maxWidth="xs">
        {this.state.register ? (
          <Register
            registerChange={this.registerChange}
            changeHandler={this.changeHandler}
            registrationHandler={this.registrationHandler}
            passwordValid={this.state.passwordValid}
            passwordCheckValid={this.state.passwordCheckValid}
          />
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: '10vh'
            }}
          >
            <Typography variant="h4">Login</Typography>
            <form>
              <TextField
                variant="filled"
                id="username"
                label="Username"
                name="username"
                margin="normal"
                required
                fullWidth
                onChange={e => this.changeHandler(e)}
                autoFocus
              />
              <TextField
                variant="filled"
                id="password"
                label="Password"
                name="password"
                margin="normal"
                required
                error={!passwordValid}
                fullWidth
                type="password"
                onChange={e => this.changeHandler(e)}
              />
              <Button
                onClick={this.loginHandler}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Login
              </Button>
              <Button
                onClick={this.registerChange}
                component="div"
                fullWidth
                variant="outlined"
                style={{ margin: '10px 0' }}
              >
                Don't have an account? Sign Up
              </Button>
            </form>
          </div>
        )}
      </Container>
    );
  }
}

export default Login;
