import React, { Component } from 'react';

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
    let commandArray = ['n','s', 'e', 'w']
    e.preventDefault();
    if (this.state.command.substring(0,3) == 'say') {
        console.log('what are you saying?', command)
        let message = this.state.command.substring(4)
        console.log(message)
    } else if (commandArray.includes(this.state.command)) {
    console.log('command sent', command)
    let room = JSON.stringify(this.props.currentRoom)
    console.log('current room', room)
    this.props.toAddProgress(room); //sends json stringified room to parent app
    } else {
      alert('Please enter a valid command.')
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
