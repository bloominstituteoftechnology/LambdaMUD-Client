import React, { Component } from 'react';
import axios from 'axios';

import './Main.css';

class Main extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            title: '',
            description: '',
            command: '',
            direction: ''
        }
    }

    componentDidMount() {
        const header = {
            headers: { Authorization: `Token ${localStorage.getItem('token')}` }
        }
        axios
        .get('https://advbackend.herokuapp.com/api/adv/init/', header)
        .then( response => {
        console.log(response)
        this.setState({ 
            username: response.data.name,
            title: response.data.title,
            description: response.data.description })
        })
        .catch(e => console.log(e))
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    submitCommand = event => {
        const { direction } = this.state;
        event.preventDefault();
        const header = {
            headers: { Authorization: `Token ${localStorage.getItem('token')}` }
        };

        if (direction === "n" || direction === "s" || direction === "w" || direction === "e") {
            axios
            .post('https://advbackend.herokuapp.com/api/adv/move/',{direction}, header)
            .then(response => {
                this.setState({
                    username: response.data.name,
                    title: response.data.title,
                    description: response.data.description,
                    direction: ''
                });
            })
            .catch(err => console.log(err))
        }
        else {
            console.log("Not a valid command!")
        }};

    render() {
        return (
            <form className="game-window" onSubmit={this.submitCommand}>
                <div className="game-card">
                    <div className="game-output">
                        <span><b>Room: {this.state.title}</b></span><br/><br/>
                        <span>{this.state.description}</span>
                    </div>
                    <h5 className="game-command">
                        >>Command: {this.state.direction}
                    </h5>
                    <input 
                        type="text" 
                        placeholder="What do you want to do?"
                        name="direction"
                        value={this.state.direction}
                        onChange={this.handleChange}/>
                    <button type="submit">Send</button>
                </div>
            </form>
        )
    }
}

export default Main;