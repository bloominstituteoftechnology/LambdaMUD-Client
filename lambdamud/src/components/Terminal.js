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

    this.state.terminaloutput.push(this.state.terminalinput);

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