
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
        console.log(this.props)
        if (this.props.uuid !== prevProps.uuid) {
            const pusher = new Pusher("1e766e30715a1dc648f8", {
              cluster: "us2",
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
        return <React.Fragment>
            <StyledGame className="backside" style={{ background: "white", border: "1px" }}>
              <h3>
                Hello, <br /> <p style={{ color: "#4286f4" }}>
                  {this.props.name}
                </p>
              </h3>
              {this.props.data.map((message, index) => {
                return <div key={index}>
                    <p style={{ color: "#9242f4" }}>
                      {message}
                    </p>
                  </div>;
              })}
            </StyledGame>
            <form style={{ border: "2px", borderRadius: "15px" }} onSubmit={this.handleSubmit}>
              <StyledInput type="text" name="text" onChange={this.handleChange} value={this.state.text} />
            </form>
          </React.Fragment>;
    }
}

export default Game;
