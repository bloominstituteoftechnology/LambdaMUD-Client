
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Register from './components/Register';
import LogIn from './components/LogIn';
import Play from './components/Play';
import Home from './components/Home';
import { Container } from 'reactstrap';

// Component App routes user correctly to Home, Play, LogIn and Register Component
// when user clicks corresponding links
class App extends Component {
  render() {
    return (
        <Router>
          <Container>
            <Route exact path="/" component={Home} />
            <Route path="/play" component={Play} />
            <Route path="/login" component={LogIn} />
            <Route path="/register" component={Register} />
          </Container>
        </Router>
    );
  }
}

export default App;