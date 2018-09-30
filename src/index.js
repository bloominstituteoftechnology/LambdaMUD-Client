import React from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter as Router } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
// import createHashHistory from 'history/createHashHistory';
import './index.css';
import AppBar from './Components/AppBar';

import registerServiceWorker from './registerServiceWorker';
import { createMuiTheme } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

// const hashHistory = createHashHistory({ basename: process.env.PUBLIC_URL });

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#50bf45',
      main: '#008e10',
      dark: '#005f00',
      contrastText: '#fff'
    },
    // primary: {
    // light: '#59a67b',
    // main: '#28774f',
    // dark: '#004a26',
    // contrastText: '#fff'
    // },
    secondary: {
      light: '#6fff76',
      main: '#fff',
      dark: '#00ca00',
      contrastText: '#000'
    }
  }
});

ReactDOM.render(
  // <Router history={hashHistory}>
  <Router>
    <MuiThemeProvider theme={theme}>
      <AppBar />
    </MuiThemeProvider>
  </Router>,
  document.getElementById('root')
);
registerServiceWorker();
