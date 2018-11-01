import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Home extends Component {
  render() {
    return (
        <div>
            <h1>LambdaMUD</h1>
            <Link to="/register"><button>Register</button></Link>
            <Link to="/login"><button>Login</button></Link>
        </div>
    );
  }
}

export default Home;
