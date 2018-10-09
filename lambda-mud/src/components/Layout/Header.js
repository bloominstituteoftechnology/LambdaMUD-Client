import React, { Component } from 'react';
import logo from './lambda-logo.svg';

class Header extends Component {

  render() {
    return (
      <header>
        <img src={logo} width="140" height="40" alt="Lambda" />
      </header>
    );
  }
};

export default Header;