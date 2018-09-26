import React, { Component } from 'react';
import '../styles/mainScreen.css';
import axios from 'axios';
import Pusher from 'pusher-js';

const URL = process.env.REACT_APP_API_URL;

class MainScreen extends Component {
  constructor() {
    super();
    this.state = {
      messages: []
    };
  }

  componentDidMount() {
    const token = sessionStorage.getItem('key');
    axios
      .get(`${URL}/adv/init/`, {
        headers: {
          "Authorization": "Token " + token,
          "Content-Type": "application/json"
        }
      })
      .then(({data}) => console.log(data))
      .catch((err) => console.log(err.response)); 
  }
  
  render() {
    return (
      <div className="Main-Screen">
        <div>Main Screen</div>
      </div>
    );
  }
}

export default MainScreen;
