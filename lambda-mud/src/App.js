import React, { Component } from 'react';
import Login from './components/Login';
import Adventure from './components/Adventure';
import {Link} from 'react-router-dom';
import Styled from 'styled-components';


const Header = Styled.div `
  background: #368A78;
  width: 100%;
  height: 50px;
  padding: 30px;
`;


class App extends Component {
  render() {
    return (
      <div>
        <Header>
          <h1>Lambda Adventure</h1>
        </Header>
        {localStorage.getItem("token") ? <Adventure />:
        <div><Login /><Link to='/register'>Sign up </Link>
        </div>}

      </div>
    );
  }
}

export default App;
