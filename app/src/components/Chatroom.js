import React from 'react';

class ChatRoom extends React.Component {
    state = {

    }

    render() {
        return (
            <div>


                CHATROOM
                <button onClick={this.props.logout}>Logout</button>
            </div>
        )
    }
}

export default ChatRoom