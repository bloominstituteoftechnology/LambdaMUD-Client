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
    this.setState({ [e.target.name]: e.target.value });
  };

  loginHandler = e => {
    e.preventDefault();
    const { username, password } = this.state;
    axios
      .post('https://lambda-mud-test.herokuapp.com/api/login/', {
        username: username,
        password: password
      })
      .then(data => {
        localStorage.setItem('Authorization', data.data.key);
        this.props.login()
      })
      .catch(err => {
        console.log(err);
      });
  };

  registrationHandler = e => {
    e.preventDefault();
    const { username, password, passwordCheck } = this.state;
    if (password === passwordCheck) {
      axios
        .post('https://lambda-mud-test.herokuapp.com/api/registration/', {
          username: username,
          password1: password,
          password2: passwordCheck
        })
        .then(data => {
          console.log(data.data.key)
          localStorage.setItem('Authorization', data.data.key);
          this.props.login()
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      console.log(password, passwordCheck);
      this.setState(prev => {
        return { passwordCheckValid: !prev.passwordCheckValid, password: '', passwordCheck: '' };
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
            username={this.state.username}
            password={this.state.password}
            passwordCheck={this.state.passwordCheck}

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
            <form onSubmit={this.loginHandler}>
              <TextField
                variant="filled"
                id="username"
                label="Username"
                value={this.state.username}
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
                value={this.state.password}
                name="password"
                margin="normal"
                required
                error={!passwordValid}
                fullWidth
                type="password"
                onChange={e => this.changeHandler(e)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disableRipple
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
