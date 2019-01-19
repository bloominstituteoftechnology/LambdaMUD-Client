import React from 'react';
import logo from './logo.svg';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap'; 
import Authenticate from './Authenticate'

class MainScreen extends React.Component {
  handleLogout = () => {
    localStorage.removeItem('key')
    this.props.history.push('/api/login')
    alert('Logged Out!!');
  }

  render() {
    return (
      <div className="MainScreen">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to LambdaMUD!</h1>
        </header>
        <Link to="/api/play">Start Game</Link>
        <Button color="primary" onClick={this.handleLogout}>Logout</Button>
      </div>
    )
  }
}

export default Authenticate(MainScreen);