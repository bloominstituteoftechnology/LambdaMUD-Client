import React, { Component } from 'react';

class Messages extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div className='messages'>
                <h3>Messages:</h3>
                    {this.props.messages ? this.props.messages.map((m, i) => {
                        return (
                            <div key={i}>
                                {this.props.sayName} said: {m}
                            </div>
                        )
                    }) : null}
                    <p>{this.props.moveDir}</p>
            </div>
        )
    }
}

export default Messages;