import React, { Component } from 'react';
import axios from 'axios';

const API_URL = '';

class Footer extends Component {
  constructor() {
    super();
    this.state = {
      temp: []
    };
  }

  render() {
    return (
      <footer>
        Footer
      </footer>
    );
  }
};

export default Footer;