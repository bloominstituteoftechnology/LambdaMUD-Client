import React, { Component } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js'


export default class Login extends Component {
    constructor(){
        super();
        this.state = {
            terminalinput: '',
            terminaloutput: [],
            description: '', 
            name: '', 
            players: [],
            title: '', 
            uuid: '',
        }
    }

    componentDidMount() {


        const token = localStorage.getItem('Token');
        const reqOptions = {
            headers: {
                Authorization: `Token ${token}`,
                'Content-Type': 'application/json'
            }
        };

        axios
        .get("https://lambdamudmboegner.herokuapp.com/api/adv/init/", reqOptions)
        .then(response => { 
           this.setState({
               description: response.data.description,
               name: response.data.name,
               players: response.data.players,
               title: response.data.title,
               uuid: response.data.uuid,
               terminaloutput: [{message: `Welecome ${response.data.name}. You are in the ${response.data.title}. ${response.data.description}. Players in the room: ${response.data.players} `},]
           })
        })
        .catch((error) => console.log(error.response));
    }


    inputHandler = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    terminalHandler = e => {
        e.preventDefault();
        let input = this.state.terminalinput
        const token = localStorage.getItem('Token');
        let headers = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            }
        }
        //=========== SAY COMMAND ===============//

        if(input.substr(0, input.indexOf(' ')) === 'say') {
            let message = {
                message: input.substr(input.indexOf(' ') + 1),
            }

            axios
            .post("https://lambdamudmboegner.herokuapp.com/api/adv/say/", message, headers)
            .then(response => { 
                console.log('say post SUCCESS!', response)
                let terminaloutput = this.state.terminaloutput.slice(); 
                terminaloutput.push({
                    message: response.data.message
                });
                this.setState({terminaloutput : terminaloutput});
            })
            .catch((error) => console.log('say post failed',error.response));
        } 
        else if (input.substr(0, input.indexOf(' ')) === 'move') {

            let message = {
                direction: input.substr(input.indexOf(' ') + 1),
            }

            axios
            .post("https://lambdamudmboegner.herokuapp.com/api/adv/move/", message, headers)
            .then(response => { 
                console.log('say post SUCCESS!', response)
                let terminaloutput = this.state.terminaloutput.slice(); 
                terminaloutput.push({
                    message: `You are in the ${response.data.title}. ${response.data.description}. Players in the room: ${response.data.players} `
                });
                this.setState({terminaloutput : terminaloutput});
            })
            .catch((error) => console.log('say post failed',error.response));
        }
    }

    render(){

        const socket = new Pusher('365cf43ebb8f4a32c780', {
            cluster: 'us2',
        });
        
        let channel = socket.subscribe(`LambdaMUD-${this.state.uuid}`);
        
        let getMessage = (channel) => {
            return new Promise(
                (resolve) => {
                    channel.bind('my-event', function(data) {                    
                        let newMessage = data.message;
                        resolve(newMessage);
                    })
                }
            );
        }  
            
        getMessage(channel)
            .then(newMessage => {
                let terminaloutput = this.state.terminaloutput.slice(); 
                terminaloutput.push({
                    message: newMessage
                });
                this.setState({terminaloutput : terminaloutput});
                })
            .catch(error => {
                console.log(error)
            })    

        

        return (
            <div>
                <div className="terminal-output">
                    {this.state.terminaloutput.map(output => {
                        return `${output.message} \n`;
                    })}
                </div>

                <div className="form">
                <div className="form-title">Terminal</div>

                <div className="form-body">
                    <form onSubmit={this.terminalHandler}>
                    <input
                        type="text"
                        className="form-inputusername"
                        name="terminalinput"
                        onChange={this.inputHandler}
                        placeholder="User input"
                        value={this.state.terminalinput}
                    />
                    <button className="form-button">
                        Send
                    </button>
                    </form>
                </div>
                </div>
            </div>
    );
    }
}