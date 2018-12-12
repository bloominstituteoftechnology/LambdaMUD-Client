import React, {Component} from 'react'
import Pusher from 'pusher-js';

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
const commands = {
    say: 'say'
}

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
          text:''
        };
    }

    componentDidMount() {
        const token = localStorage.getItem('jwt');
        this.props.fetchInitInfo(token)
    }

    componentDidUpdate(prevProps) {
        if (this.props.uuid !== prevProps.uuid) {
            const pusher = new Pusher('a5a7d6f6a9d48903eddc', {
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
        const token = localStorage.getItem('jwt');
        const command = this.state.text.split(' ');
        if (moves[command[0]]) {
            this.props.movePlayer(moves[command[0]], token);
        } else if (commands[command[0]]) {
            command.shift()
            let message = command.join(' ')
            this.props.talkPlayer(message, token);
        }
        this.setState({ text: '' });
    };

    render(){
        return(
            <div className = "main">
                <h2>{this.props.name}'s Adventure</h2>
                <div className = "message-log">
                    {this.props.data.map((message, index) => {
                        return(
                            <div key = {index}>
                                {message}
                            </div>                           
                        )
                    })} 
                    <form onSubmit={this.handleSubmit}>
                        <input
                            type="text"
                            name="text"
                            onChange={this.handleChange}
                            value={this.state.text}
                        />
                    </form>
                </div>
            </div>
        )
    }
} 

export default Main