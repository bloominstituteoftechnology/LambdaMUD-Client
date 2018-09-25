import React, {Component} from 'react';
import '../App.css'
import Authenticate from './Authenticate'
import axios from 'axios';

class Play extends Component {
  constructor(props) {
    super(props)
    this.state = {
      player: {
          name:'',
          title:'',
          description:'',
          uuid:''
      }
    }
  }

  handleLogout = () => {
    localStorage.removeItem('key')
    window.location.reload()
  }

  componentDidMount() {
        let key = 'Token ' + localStorage.getItem('key')
        axios
          .get('https://lambda-adv-mud.herokuapp.com/api/adv/init', {
            headers: {
              "Authorization": key
            }
          })
          .then(response => {
            this.setState({player: response.data})
          })
  }
  

  render() {
    console.log(this.state.player)
    return (
      <div className="Main">
        <p className="Main-intro">
          TIME TO PLAY THE GAME
        </p>
        <h2>{this.state.player.name}</h2>
        <h3>{this.state.player.title}</h3>
        <h4>{this.state.player.description}</h4>
        <h5>{this.state.player.uuid}</h5>
        <button id='left'>&#9664;</button>
        <button id='right'>&#9654;</button>
        <button id='up'>&#9650;</button>
        <button id='down'>&#9660;</button>
        <button onClick={this.handleLogout}>Logout</button>
      </div>
    );
  }
  }
  
  export default Authenticate(Play);
  