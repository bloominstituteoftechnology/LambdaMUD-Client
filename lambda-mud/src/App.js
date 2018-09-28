import React, { Component } from 'react';
import {connect} from 'react-redux';
import Adventure from './components/Adventure';
import {Link} from 'react-router-dom';
import Styled from 'styled-components';


const Header = Styled.div`
  background-image: url('https://images.pexels.com/photos/220067/pexels-photo-220067.jpeg?auto=compress&cs=tinysrgb&h=350');
  background-repeat: no-repeat;
  background-size: cover; 
  background-position: center;
  width: 100%;
  height: 120px;
  padding: 10px 0 0 30px;
`;

const Button = Styled.button`
    width: 100px;
    height: 30px;
    align-self: center;
    margin: 10px;
    background: #88A75D
`;

const MainContainer = Styled.div`
    display: flex;
    justify-content: center;
    margin: 20px;
`;

const AdventureHead = Styled.h1`
font-family: 'Uncial Antiqua', cursive;
  font-size: 54px;
  color: #FECD65;
  text-shadow: 0 1px 0 #ccc, 0 2px 0 #88A75D, 0 3px 0 #88A75D, 0 4px 0 #29567E, 0 5px 0 #88A75D, 0 6px 1px #29567E, 0 0 5px #29567E, 0 1px 3px rgba(0,0,0,.3), 0 3px 5px #29567E, 0 5px 10px #29567E, 0 10px 10px rgba(0,0,0,.2), 0 20px 20px rgba(0,0,0,.8);
  
`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false
    }
  }
  render() {
    return (
      <div>
        <Header>
          <AdventureHead>Adventure</AdventureHead>
        </Header>
        {localStorage.getItem("token") ? <Adventure />:
        <MainContainer><Link to='/login'><Button>Log in</Button> </Link>
        <Link to='/register'><Button>Sign up </Button></Link>
        {this.props.loggingIn ? <h5>Loading</h5> : null}
        </MainContainer>}

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggingIn: state.users.loggingIn
  }
}

const mapActionsToProps = {

}
export default connect( mapStateToProps, mapActionsToProps)(App);
