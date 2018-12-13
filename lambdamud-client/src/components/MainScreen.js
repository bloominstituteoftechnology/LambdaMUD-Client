import React from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';

var pusher = new Pusher('4467dc4bce09db57fe17', {
  cluster: 'us2',
  forceTLS: true
});

class MainScreen extends React.Component {
  state = {
    uuid: '',
    name: '',
    title: '',
    description: '',
    players: [],
    error_msg: '',
    userInput: '',
  };

  

  componentDidMount() {
    // gets token from local storage
    const token = localStorage.getItem('token');

    const options = {
      headers: {
        "Authorization": 'Token ' + token
      }
    }  

  // GET axios call that initializes a player into a room
  // it takes in the token to be able to do so
  axios
      .get('https://lambdamud-project-week.herokuapp.com/api/adv/init/', options)
      .then(response => {
        console.log(response);

        var channel = pusher.subscribe('p-channel-' + response.data.uuid);
  channel.bind('broadcast', function(message) {
    alert(JSON.stringify(message));
  });

        this.setState({ uuid: response.data.uuid, name: response.data.name, title: response.data.title, description: response.data.description, players: response.data.players });
      })
      .catch(err => {
        console.log(err.response);
      });
      

  
    }

    // allows us a player to move around the world from room to room using a POST API
    moveToRoom = event => {
        event.preventDefault();

        // gets token from local storage
        const token = localStorage.getItem('token');

        const options = {
            headers: {
              "Authorization": 'Token ' + token
          }

    }

        // the direction that the player wants to move in
        const userMove = {
          'direction': this.state.userInput,
        }       

        // POST api call that lets a player to move around the world, one direction at a time
        axios
        .post('https://lambdamud-project-week.herokuapp.com/api/adv/move/', userMove, options)
        .then(response => {
          console.log(response);
          this.setState({ name: response.data.name, title: response.data.title, description: response.data.description, players: response.data.players, error_msg: response.data.error_msg });
        })
        .catch(err => {
          console.log(err.response);
        });

        this.setState({description: ''});
        this.props.history.push('/mainscreen');
      }

    // allows a player to send a message to other players that are in the same room with them
    sayInRoom = event => {
      event.preventDefault();

      // gets token from local storage
      const token = localStorage.getItem('token');

      const options = {
          headers: {
            "Authorization": 'Token ' + token
        }

  }

      // the message that will be broadcasted
      const userSay = {
        'message': this.state.userInput,
      }       
  
      // POST axios call that lets players broadcast messages to everyone that is in the same room as they are
      axios
      .post('https://lambdamud-project-week.herokuapp.com/api/adv/say/', userSay, options)
      .then(response => {
        console.log(response);
        this.setState({ name: response.data.name, title: response.data.title, description: response.data.description, players: response.data.players, error_msg: response.data.error_msg });
      })
      .catch(err => {
        console.log(err.response);
      });

      this.setState({description: ''});
      this.props.history.push('/mainscreen');
    }

      // allows us to add new information on state
      handleInputChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
      }


  render() {
    const playersArray = this.state.players.slice();

    if (this.state.userInput === "n" || this.state.userInput === "e" || this.state.userInput === "w" || this.state.userInput === "s" ) {
    return(
      <div>
        <div className='adv-title-div' >
        <h1>Adventure</h1>
        </div>
          <p>{this.state.name}, you are in the</p>
          <p>{this.state.title}</p>
          <p>{this.state.description}</p>
        
        {playersArray.map((player,index) => <div className={"players"} key={index} player={player} >
              <p>{player} is standing here</p>
            </div>)}
            <p>{this.state.error_msg}</p>
  
          <form className='mainscreen-adv' onSubmit={this.moveToRoom}>
          <div className='mainscreen-form-div'>
            <label htmlFor="userInput"></label>
            <input
              name="userInput"
              value={this.state.userInput}
              onChange={this.handleInputChange}
              type="text"
            />
            <button type="submit">Send</button>
          </div>
        </form>
      </div>
      );
    } 
    
    return(
    <div>
      <div className='adv-title-div' >
      <h1>Adventure</h1>
      </div>
        <p>{this.state.name}, you are in the</p>
        <p>{this.state.title}</p>
        <p>{this.state.description}</p>
      
      {playersArray.map((player,index) => <div className={"players"} key={index} player={player} >
            <p>{player} is standing here</p>
          </div>)}
          <p>{this.state.error_msg}</p>

        <form className='mainscreen-adv' onSubmit={this.sayInRoom}>
        <div className='mainscreen-form-div'>
          <label htmlFor="userInput"></label>
          <input
            name="userInput"
            value={this.state.userInput}
            onChange={this.handleInputChange}
            type="text"
          />
          <button type="submit">Send</button>
        </div>
      </form>
    </div>
    );
  }
}

export default MainScreen;
