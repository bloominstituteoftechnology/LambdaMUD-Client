import React from 'react';
import {connect} from 'react-redux';
import Pusher from 'pusher-js';


class Chat extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            sender: '',
            message: ''
        }
    }

    componentDidMount() {
            this.setState({sender: this.props.sender, message: this.props.message});
            const updated = this.state.messages.slice();
            updated.push(Object(this.state.sender, this.state.message))
            this.setState({messages: updated})
    }
    render() {
        return(
            <div>
                <ul>
                {this.state.messages.map(message => {
                    return (
                        <li key={message.message}>
                            <div>
                                {message.senderId}
                            </div>
                            <div>
                                {message.text}
                            </div>
                        </li>
                    )
                })}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        uuid: state.game.uuid,
      sender: state.game.sender,
      message: state.game.message
    }
  }
  
  const mapActionsToProps = {

  }

  export default connect( mapStateToProps, mapActionsToProps)(Chat);

