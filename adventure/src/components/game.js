import axios from 'axios';
import React, {Component} from 'react';
import Pusher from 'pusher-js';

const url = 'https://adventuregame-app.herokuapp.com'

class GameView extends Component {
    constructor() {
        super();
        this.state = {
            uuid: '',
            name: '',
            title: '',
            description: '',
            players: [],           
            messages: '',
            savedMessages: [],            
            input: '', 
            direction: '',
        };
    }


componentDidMount() {
    this.handleData();
}


handleData = () => {
    const header = {
      headers: {
        authorization: `TOKEN ${localStorage.getItem('token')}`
      }
    };

    axios
    .get(`${url}/api/adv/init/`, header)
    .then(response =>{
      console.log(response)
      this.setState(response.data)
      console.log(this.state)
    var pusher = new Pusher('76602eee52c0dbf36eec', {
        cluster: 'us2'
    });
    var channel = pusher.subscribe(`p-channel-${this.state.uuid}`);
    channel.bind('broadcast', data => {
        this.setState({
            savedMessages: [...this.state.savedMessages, data.message]
        })
    })
    })
    .catch(error => {
        alert(error.response.data.error);
    });
    
  }

  handleMessage = (event) => {
    event.preventDefault();
     const message = {
        message: this.state.message
    };
     const header = {
        headers: {
          authorization: `Token ${localStorage.getItem('token')}`
        }
      };
     axios
    .post(`${url}/api/adv/say/`, message, header)
    .then(response => {
        let savedMessages = this.state.savedMessages.slice();
        savedMessages.push(response.data);
        this.setState({savedMessages: [...this.state.savedMessages, `You said ${message.message}`]});
    })  
    .catch(error => {
        alert(error.response.data.error);
    });
};

handleChange = event => {
    this.setState({ [event.target.name]: event.target.value});
}

MakeMove = event => {
    event.preventDefault();

    const header = {
        headers: {
          authorization: `TOKEN ${localStorage.getItem('token')}`
        }
      };
    axios
    .post(`${url}/api/adv/move/`, {direction: this.state.direction}, header)
    .then(response => {
        console.log(response)
        this.setState(response.data)
    })
    .catch(error => {
        alert(error.response.data.error);
    });
};

    render() {
        console.log(this.state.savedMessages)
        return(
        <div className = 'gameImage'>
                <div className = 'description'>
                <h3>You Are In The {this.state.title}</h3>
                <h4>{this.state.description}</h4>
                <h3>Make Your Move</h3> 
                <div className = 'directions'>
                <h4>n = north</h4>
                <h4>s = south</h4>
                <h4>e = east</h4>
                <h4>w = west</h4>
                </div>                
                <form onSubmit = {this.MakeMove}>
                <input
                name = 'direction'
                value = {this.state.direction}
                onChange = {this.handleChange}
                placeholder = "Enter a direction"
                />
                <button>
                    Press To Move
                </button>    
            </form> 

            </div>
            <div className = "playersBox">
            <div className = "players">
            <h4>Other players in the area: </h4>
                {this.state.players.map(player => {
                    return(
                        <div >
                            <h4>
                                {player}
                            </h4>
                        </div>
                    )
                })}
            </div> 
            <div className = 'chat'>           
            <div className = 'chatBox'>
            <h4>Chat With others</h4>
                <input value={this.state.speak} placeholder='Say Something' onChange={this.handleChange} name='message' />
                <button type='button' onClick={this.handleMessage} >Send</button>
            </div>
            <div className = 'activityLog'>
                    <h4 >Activity:
                <ul>
                    {this.state.savedMessages.map((lineOfText, index) => {
                      return (
                            <li key={index}>{lineOfText}</li>
                      )
                    })}
                </ul>
                </h4>
            </div>   
            </div> 
            </div>
        </div>
        
        )}

}
export default GameView;