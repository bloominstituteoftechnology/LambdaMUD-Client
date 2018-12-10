import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password1: '',
      password2: '',
      mismatch: false
    };
  }

  
}