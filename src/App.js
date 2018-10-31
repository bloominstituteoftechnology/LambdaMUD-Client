import React, { Component } from 'react';
import { Route, Redirect} from 'react-router-dom'
import { Auth, Game } from './components'
import './App.css';
import styled from 'styled-components'

export default class App extends Component {
  state = {
    loggedIn: false,
  }

  componentDidMount(){
    if(localStorage.getItem('MUD')){
      this.setState({
        loggedIn: true,
      })
    } else {
      this.setState({
        loggedIn: false,
      })
    }
  }

  render() {
    return (
      <div className="App">
        <AppDiv>
          {localStorage.getItem('MUD') ? <Redirect from="/" to="/game" /> : <Redirect from="/" to="/auth" />}
          <Route path="/game" component={Game} />
          <Route path="/auth" component={Auth}></Route>         
        </AppDiv>
      </div>
    );
  }
}

const AppDiv =styled.div`
  height: 100%;
  background: black;
  color: green;
  margin: 0;
`