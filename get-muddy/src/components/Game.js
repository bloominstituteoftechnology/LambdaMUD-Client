import React from 'react';
import axios from 'axios';
import './styling/Game.css';
import Authenticate from './Authenticate';

class Game extends React.Component {
    state = {
            uuid: '',
            name: '',
            title: '',
            description: '',
            players: [],
            userInput: ''
        }
    
    componentDidMount = () => {
        const key = sessionStorage.getItem('key')
        axios.get('https://lambda-mud-.herokuapp.com/api/adv/init/', {headers: {Authorization: `Token ${key}`}})
            .then(res => {
                const data = res.data
                this.setState({ uuid: data.uuid, name: data.name, title: data.title, description: data.description, players: data.players }
                , () => this.update());
        })
            .catch(err => console.log(err.res));
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount = () => {
        window.removeEventListener('keydown', this.handleKeyDown)
    };
    
    handleSay = e => {
        e.preventDefault();
        const key = sessionStorage.getItem('key')
        axios.post('https://lambda-mud-.herokuapp.com/api/adv/say/', { 'message': this.state.userInput }, 
        {headers: {Authorization: `Token ${key}`, "Content-Type": "application/json"}})
        .then(res => {
            const userInput = this.state.userInput
            userInput.push(res.data.message)
            this.setState({ userInput }, () => this.update(res.data.message));
        })
        .catch(err => console.log(err.res));
    }

    handleMove = (direction) => {
        const key = sessionStorage.getItem('key')
        axios.post('https://lambda-mud-.herokuapp.com/api/adv/move/', {'direction': direction}, 
        {headers: {Authorization: `Token ${key}`, "Content-Type": "application/json"}})
        .then(res => {
            const data = res.data
            this.setState({ name: data.name, title: data.title, description: data.description, players: data.players })
        })
        .catch(err => console.log(err.res));
    };

    handleInputChange = e => { this.setState({[e.target.name]: e.target.value }); }

    udpate = (message=null) => {
        const history = this.state.history
        let newContent;
        if (message) {
            newContent = { message: message };}
        else {
            newContent = {
                title: this.state.title,
                description: this.state.description,
                players: this.state.players
            };
        }
        history.unshift(newContent)
        this.setState({ history: history })
    }

    render() {
        const history = this.state.history.slice().reverse();
        return (
            <div>
            <span> uuid: {this.state.uuid}</span>
            <span> name: {this.state.name}</span>
            <span> title: {this.state.title}</span>
            <span> description: {this.state.description}</span>
            <span> players: {this.state.players.map(player => {
            return <li key={Math.random()}>{player.name}</li>})}</span>
            <div className="history-container">
              {history.map(item => {
                if (item['message']) {
                    return (<div key={Math.random()} className="history-item"><div className="message">{this.state.name}: {item.message}</div> </div>)} 
                else {
                    return (
                  <div key={Math.random()} className="history-item">
                    <div className="title">{item.title}</div>
                    <div className="description">{item.description}</div>
                    <div className="players">{item.players.join(", ")}</div>
                  </div>)
                }})}
            </div>
            <div className="Chatbox">
                <form className="game-form"onSubmit={this.handleSay}>
                <input name="userInput" placeholder="Chat.." value={this.state.userInput} onChange={this.handleInputChange} />
                <button type='submit' className="chat-button">Send</button>
                </form>
            </div>
            <div onClick={this.props.logout} className="logout">log out</div>
            </div>
        );
    }
}

export default Authenticate(Game);
