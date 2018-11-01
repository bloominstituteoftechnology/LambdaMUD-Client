import React, { Component } from 'react';
import { Route } from "react-router-dom";
import {  Link } from "react-router-dom";

import './App.css';

import Register from './components/register/Register';
import Login from './components/login/Login';
import Home from './components/home/Home'
import {HomeContainer, FormContainer} from './components/home/HomeStyles'
import {Grid, Input, Button} from './components/global-styles/Global'

// not implemented yet
import Game from './components/game/Game';

class App extends Component {

  render() {
    return (
      <HomeContainer>
        <FormContainer>
        <Grid col3>
        <Link to='/register' ><Button>Register</Button></Link>
        <Link to='/login' ><Button>Login</Button></Link>
        <Link to='/' ><Button>Play the game!</Button></Link>
        </Grid>
        <Route path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        </FormContainer>
      </HomeContainer>
    );
  }
}
export default App;