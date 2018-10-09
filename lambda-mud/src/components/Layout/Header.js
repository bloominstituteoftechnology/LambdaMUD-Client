import React, { Component } from 'react';
import axios from 'axios';

const API_URL = '';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      temp: []
    };
  }

  render() {
    return (
      <header>
        Header
      </header>
    );
  }
};

export default Header;