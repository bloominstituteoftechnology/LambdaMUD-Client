import React, { Component } from 'react';
import axios from 'axios';

class Main extends Component {
  state = {  }

  componentDidMount() {
    axios.get('https://mudmud.herokuapp.com/api/adv/init', {headers: {Authorization: 'Token 1e85198a887bf656c4da17ea8bc9e4e3d4eea4c7'}})
      .then(response => {
      console.log(response)
    })
  }

  render() { 
    return ( <div>yo</div> );
  }
}
 
export default Main;




