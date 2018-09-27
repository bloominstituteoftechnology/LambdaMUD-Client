import React from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter as Router } from 'react-router';
import { Router } from 'react-router';
import createHashHistory from 'history/createHashHistory';
import './index.css';
import AppBar from './Components/AppBar';

import registerServiceWorker from './registerServiceWorker';
import { createMuiTheme } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

const hashHistory = createHashHistory({ basename: process.env.PUBLIC_URL });

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

ReactDOM.render(
  <Router history={hashHistory}>
    <MuiThemeProvider theme={theme}>
      <AppBar />
    </MuiThemeProvider>
  </Router>,
  document.getElementById('root')
);
registerServiceWorker();
