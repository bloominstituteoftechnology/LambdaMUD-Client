import React, {Component} from 'react';
import '../App.css'
import Authenticate from './Authenticate'
import axios from 'axios';
import Pusher from 'pusher-js';

var pusher = new Pusher('edd377db6931e48605bb', {
  cluster: 'us2',
  forceTLS: true
});

class Play extends Component {
  constructor(props) {
    super(props)
    this.state = {
      player: {
          name:'',
          title:'',
          description:'',
          uuid:'',
          error_msg:'',
          players: []
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

            let channelString = 'p-channel-' + response.data.uuid
            var channel = pusher.subscribe(channelString);
              channel.bind('broadcast', function(data) {
                console.log('DATA', JSON.stringify(data))
                alert(JSON.stringify(data));
              });
              
          })
          .catch(error => {
            console.log(error)
          })
        }

  move = (e) => {
      const direction = e.target.getAttribute('direction')
      const token = 'Token ' + localStorage.getItem('key')
      console.log(pusher)
      axios
        .post('https://lambda-adv-mud.herokuapp.com/api/adv/move/', {"direction": direction}, {
            headers: {
                Authorization: token,
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            this.setState({player: response.data})
        })
        .catch(error => {
            console.log(error)
        })
  }

  render() {
    return (
      <div className="Main">
        <p className="Main-intro">
          TIME TO PLAY THE GAME
        </p>
        <h2>{this.state.player.name}</h2>
        <h3>{this.state.player.title}</h3>
        <h4>{this.state.player.description}</h4>
        <h5>{this.state.player.uuid}</h5>
        <h5>{this.state.player.error_msg}</h5>
        <h5>Players: {this.state.player.players}</h5>
        <button direction='w' onClick={this.move}>&#9664;</button>
        <button direction='e' onClick={this.move}>&#9654;</button>
        <button direction='n' onClick={this.move}>&#9650;</button>
        <button direction='s' onClick={this.move}>&#9660;</button>
        <button onClick={this.handleLogout}>Logout</button>
      </div>
    );
  }
  }
  
  export default Authenticate(Play);
  