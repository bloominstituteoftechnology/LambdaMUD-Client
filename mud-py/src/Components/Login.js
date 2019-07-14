import React from 'react';
import Register from './Register';
import {
  Container,
  Typography,
  TextField,
  Button,
  makeStyles,
  withStyles
} from '@material-ui/core';
import axios from 'axios';

const useStylesLogin = makeStyles(theme => ({
  root: {
    border: '1px solid #e2e2e1',
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor: '#888',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:hover': {
      backgroundColor: '#bbb'
    },
    '&$focused': {
      backgroundColor: '#fff',
      borderColor: theme.palette.primary.main
    }
  },
  focused: {}
}));

const PrimaryButton = withStyles({
  root: {
    backgroundColor: 'darkorange',
    color: 'black',
    border: '6px solid firebrick',
    borderRadius: '5px',
    '&:hover': {
      backgroundColor: '#cc6c00',
      borderColor: 'darkred'
    }
  }
})(Button);

const SecondaryButton = withStyles({
  root: {
    backgroundColor: '#222',
    color: 'white',
    border: '3px solid darkorchid',
    borderRadius: '5px',
    '&:hover': {
      backgroundColor: '#000',
      borderColor: '#9932CC'
    }
  }
})(Button);

function LoginTextField(props) {
  const classes = useStylesLogin();

  return (
    <TextField InputProps={{ classes, disableUnderline: true }} {...props} />
  );
}

class Login extends React.Component {
  constructor(props) {
    super(props);
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
        this.props.login();
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
          localStorage.setItem('Authorization', data.data.key);
          this.props.login();
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      this.setState(prev => {
        return {
          passwordCheckValid: !prev.passwordCheckValid,
          password: '',
          passwordCheck: ''
        };
      });
    }
  };

  render() {
    const { passwordValid } = this.state;

    return (
      <Container maxWidth="xs" style={{ color: 'gold' }}>
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
            LoginTextField={LoginTextField}
            PrimaryButton={PrimaryButton}
            SecondaryButton={SecondaryButton}
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
              <LoginTextField
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
              <LoginTextField
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
              <PrimaryButton
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Login
              </PrimaryButton>
              <SecondaryButton
                onClick={this.registerChange}
                component="div"
                color="primary"
                fullWidth
                variant="outlined"
                style={{ margin: '10px 0' }}
              >
                Don't have an account? Sign Up
              </SecondaryButton>
            </form>
          </div>
        )}
      </Container>
    );
  }
}

export default Login;
