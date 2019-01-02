// This component was a first attempt at moving Say functionality into its own component
// I'll need to work on this later when/if I refactor with redux

import React, { Component } from 'react';

class SayInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
        }
    }

    handleInputChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSayInput = message => {
        this.props.handleSaySubmit(message);
        this.setState({message: ''});
    }

    render () {
        return (
            <div className='say-input'>
                <h3>Say:</h3>
                <input 
                    name='message' 
                    type='text'
                    placeholder='message to say' 
                    value={this.state.message} 
                    onChange={this.handleInputChange}
                />
                <button onClick={this.handleSayInput}>Say message</button>
            </div>
        )
    }
}

export default SayInput;