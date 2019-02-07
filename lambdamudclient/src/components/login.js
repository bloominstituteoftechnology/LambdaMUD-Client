import React, { Component } from 'react';
import axios from 'axios';


class Login extends Component {
    state = {
        username: "",
        password: ""
    }

    handleInputChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }
    handlesSubmit = event => {
        event.preventDefault()
        const playerlogin = { username: this.state.username, password: this.state.password}

        axios.post("https://lmabdamudmok.herokuapp.com/api/login/", playerlogin)
            .then(res => {
                localStorage.setItem('token', res.data.key)
                this.props.history.push('/');
            })
        this.setState({ username:"", password:"" })
    }
    render() {
        return (
          <div>
                <div>
                    <form>
                        <input name="username" placeholder="enter username" value={this.state.username} onChange={this.handleInputChange} />
                        <input name="password" placeholder="enter password" value={this.state.password} onChange={this.handleInputChange} />
                        <button onClick={this.handleInputChange.handleSubmit}>Login</button>
                    </form>
                </div>
          </div>
        );
    }
}
export default Login;
