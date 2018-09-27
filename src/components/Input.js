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
    handleClick = (e) => {
        e.preventDefault()
        this.props.handleMove(this.state.input)
        this.setState({ input: '' })
    }
    render() { 
        return (
            <form className='Input' onSubmit={this.handleClick} autoComplete='off'>
                <input name='input' className='input' value={this.state.input} placeholder='Input here...' onChange={this.handleInputChange} />
                <button className='btn' type='submit' onClick={this.handleClick}>Send</button>
            </form>
        );
    }
}
 
export default Input;
