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

handleSay = (e) => {
    e.preventDefault()
    const talk = {
        "message": this.state.message
    }
    const auth_header = this.handleData();
    console.log(talk)
    axios.post(`${url}say`, talk, auth_header)
    .then(response => {
        console.log(response, 'say response')

    })
    .catch(err => console.log(err))
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
        const pusher_log = this.state.pusher_log.slice();
        pusher_log.push(data.message);
        this.setState({
            pusher_log: pusher_log
        })
    })
    })
    .catch(error => {console.log(error)
    })
    
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
        this.setState({savedMessages: savedMessages, message: ''});
    })  
    .catch(error => {
        console.log(error);
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
    
    .catch(error => console.log(error));
};

    render() {
        return(
        <div>
            <div>
                <h4>Description: {this.state.title}</h4>
                <p>{this.state.description}</p>
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
            <div className = "playersBox">
            <div className = "players">
            <h4>Other players in the room </h4>
                {this.state.players.map(player => {
                    return(
                        <div >
                            <p>
                                {player}
                            </p>
                        </div>
                    )
                })}
            </div>
            <h4>Talk to others</h4>
                <input value={this.state.speak} placeholder='message' onChange={this.handleChange} name='message' />
                <button type='button' onClick={this.handleSay} >Send</button>
            </div>
        </div>
        
        )}

}
export default GameView;