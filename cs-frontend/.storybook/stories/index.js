import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
  withKnobs,
  text,
  boolean,
  number,
  array,
  object
} from '@storybook/addon-knobs';

import { TextField, Button } from '@material-ui/core/';
import { BrowserRouter as Router } from 'react-router-dom';

import Login from '../../src/Components/Pages/Login';
import Register from '../../src/Components/Pages/Register';
import { createMuiTheme } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import App from '../../src/App';
// import StoryRouter from 'storybook-react-router';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#59a67b',
      main: '#28774f',
      dark: '#004a26',
      contrastText: '#fff'
    },
    secondary: {
      light: '#83b9ff',
      main: '#448aff',
      dark: '#005ecb',
      contrastText: '#000'
    }
  }
});

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  }
});

const stories = storiesOf('Storybook Knobs', module);
stories.addDecorator(withKnobs);

const state = {
  username: undefined,
  password: undefined
};

const handleChange = name => event => {
  console.log(name);
  console.log(event.target.value);
  console.log(state[name]);
  state[name] = event.target.value;
  console.log(state[name]);
};

stories.add('input', () => (
  <form>
    <TextField
      type="password"
      id="login-password"
      label="Password"
      value={state.password}
      margin="normal"
      variant="outlined"
      onChange={handleChange('password')}
    />
  </form>
));

stories.add('login', () => (
  <MuiThemeProvider theme={theme}>
    <Router>
      <Login />
    </Router>
  </MuiThemeProvider>
));

stories.add('Register', () => (
  <MuiThemeProvider theme={theme}>
    <Router>
      <Register />
    </Router>
  </MuiThemeProvider>
));

stories.add('App', () => (
  <MuiThemeProvider theme={theme}>
    <Router>
      <App />
    </Router>
  </MuiThemeProvider>
));
