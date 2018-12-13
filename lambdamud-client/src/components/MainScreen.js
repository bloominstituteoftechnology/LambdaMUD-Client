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
    const token = localStorage.getItem('token');

    const options = {
      headers: {
        "Authorization": 'Token ' + token
      }
    }  

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

  
    moveToRoom = event => {
        event.preventDefault();

        const token = localStorage.getItem('token');

        const options = {
            headers: {
              "Authorization": 'Token ' + token
          }

    }
    
        const userMove = {
          'direction': this.state.userInput,
        }       

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

    sayInRoom = event => {
      event.preventDefault();

      const token = localStorage.getItem('token');

      const options = {
          headers: {
            "Authorization": 'Token ' + token
        }

  }
  
      const userSay = {
        'message': this.state.userInput,
      }       
  
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

      handleInputChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
      }


  render() {
    const playersArray = this.state.players.slice();

    if (this.state.userInput === "n" || this.state.userInput == "e" || this.state.userInput == "w" || this.state.userInput == "s" ) {
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
