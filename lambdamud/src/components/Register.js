import React from 'react';

class Register extends React.Component {
    constructor() {
        super();

        this.state = {
            username: '',
            password: ''
        }
    }

    handleInput = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    render() {
        return (
            <form>
                <input onChange={this.handleInput} placeholder='Username' value={this.state.username} name='username' type='text' />
                <input onChange={this.handleInput} placeholder='Password' value={this.state.password} name='password' type='password' />
                <button>Connect</button>
            </form>
        );
    }
}

export default Register;