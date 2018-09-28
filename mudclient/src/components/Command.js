import React, { Component } from 'react';
import axios from 'axios';

class Command extends Component {
    constructor(props) {
        super(props)
        this.state = {
            command:'',
            Response: [],
            previousResponse: []
        }
    }

changeHandler = (e) => {
    e.preventDefault();
    this.setState({
        [e.target.name]: e.target.value
    })
}

sendCommand = (e, command) => {
    let token = sessionStorage.getItem('token')
    let auth = "Token " + token
    let commandArray = ['n','s', 'e', 'w']
    e.preventDefault();
    if (this.state.command.substring(0,3) == 'say') {
        console.log('what are you saying?', command)
        let message = this.state.command.substring(4)
        //send to pusher!!!!
        console.log(message)
    } else if (commandArray.includes(this.state.command)) {
      let dir = {"direction":this.state.command}

      let payload = JSON.stringify(dir)
      console.log('payload', payload)
      axios
      .post('https://mud-jjashcraft.herokuapp.com/api/adv/move/', payload, {
          headers: {
            "Authorization": auth
          }
        })
        .then(response => {
            console.log('initialize move response', response)
            console.log('move', response.data)
            console.log('move', response.data.description)
            console.log('move', response.data.title)
            console.log('move', response.data.players)
            if(response.data.title !== this.props.currentRoom.title){
            let room = JSON.stringify(this.props.currentRoom)
            console.log('current room', room)
            this.props.toAddProgress(room);
            sessionStorage.setItem('currentRoomTitle', response.data.title);
            sessionStorage.setItem('currentRoomDesc', response.data.description);
            this.props.toUpdateRoom({
              title: response.data.title,
              description: response.data.description,
              players: response.data.players
            })
          } else {
            alert('You cannot move any farther in that direction.')
          }
        })

    console.log('command sent', command)
     //sends json stringified room to parent app
    this.setState({command:''})
    } else {
      alert('Please enter a valid command. To send a message to the room, type "say" before your message.')
    }
}


    render() {
        let command = 'test'
        let commandbutton;
        if (this.state.command.substring(0, 3) == 'say') {
            commandbutton = <button type='submit' className='command-button'>Say</button>
        } else {
            commandbutton = <button type='submit' className='command-button'>Send</button>
        }

        return (
            <div className=''>
                <form method='post' className='command-wrapper' onSubmit = {(e)=>{this.sendCommand(e, command)}}>
                <input placeholder='enter command...' className='commandinput' required type="text" onChange = {this.changeHandler} name='command' value = {this.state.command}/>
                {commandbutton}
            </form>  
            </div>
        );
    }
}

export default Command;
