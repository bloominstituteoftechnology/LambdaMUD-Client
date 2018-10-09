import React, { Component } from 'react';
import logo from './lambda-logo.svg';

const API_URL = '';

class Header extends Component {
  
  render() {
    return (
      <header>
        <img src={logo} width="140" height="40" />
      </header>
    );
  }
};

export default Header;