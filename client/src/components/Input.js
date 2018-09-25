import React, { Component } from 'react';
import '../styles/Input.css';

class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: ''
        }
    }
    handleInputChange = (e) => {this.setState({[e.target.name]: e.target.value})}
    render() { 
        return (
            <div className='Input'>
                <input name='input' className='input' value={this.state.input} placeholder='Input here...' onChange={this.handleInputChange} />
                <div className='btn'>Send</div>
            </div>
        );
    }
}
 
export default Input;
