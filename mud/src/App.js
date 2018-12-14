import React, { Component } from 'react'; 
import Game from "./Components/Game/Game" 
import {Route} from "react-router-dom"; 
import Authenticate from "./Components/Authentication/Authenticate"
import './App.css';
import styled from "styled-components"

const AppDiv = styled.div`
min-height: 100vh;
min-width: 100%;
margin:0 ;
padding: 0 ;
`;

class App extends Component {


  render() {
    return (
      <div className="App">
        <Route exact path='/' component={Game}/>
     </div>
    );
  }
}

export default Authenticate(App);
