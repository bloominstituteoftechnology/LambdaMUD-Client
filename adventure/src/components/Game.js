
import React, { Component } from 'react';
import Pusher from 'pusher-js';
import StyledGame, { StyledInput } from '../styles/game';

const moves = {
    n: 'n',
    s: 's',
    e: 'e',
    w: 'w',
    south: 's',
    north: 'n',
    east: 'e',
    west: 'w'
};

class Game extends Component {
    state = {
        text: ''
    };

    componentDidMount() {
        const token = localStorage.getItem('token');
        this.props.fetchInitInfo(token);
    }

    componentDidUpdate(prevProps) {
        if (this.props.uuid !== prevProps.uuid) {
            const pusher = new Pusher('f5f1c81452944005d664', {
                cluster: 'us2',
                encrypted: true
            });
            const channel = pusher.subscribe(`p-channel-${this.props.uuid}`);
            channel.bind('broadcast', data =>
                this.props.fetchNewMessage(data.message)
            );
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const command = this.state.text.split(' ');
        if (moves[command[0]]) {
            this.props.movePlayer(moves[command[0]], token);
        } else {
            this.props.talkPlayer(this.state.text, token);
        }
        this.setState({ text: '' });
    };

    render() {
        return (
            <React.Fragment>
                <StyledGame>
                    <h3>Hello, {this.props.name} </h3>
                    {this.props.data.map((message, index) => {
                        return (
                            <div key={index}>
                                <p>{message}</p>
                            </div>
                        );
                    })}
                </StyledGame>
                <form onSubmit={this.handleSubmit}>
                    <StyledInput
                        type="text"
                        name="text"
                        onChange={this.handleChange}
                        value={this.state.text}
                    />
                </form>
            </React.Fragment>
        );
    }
}

export default Game;
