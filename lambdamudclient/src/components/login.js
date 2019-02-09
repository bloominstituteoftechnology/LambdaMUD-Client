import React, { Component } from 'react';
import axios from 'axios';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
    }

    handleInputChange = event => {
        this.setState({ [event.target.name]: event.target.value });
        console.log("name: ", event.target.name, event.target.value);
    };

    handleSubmit = event => {
        event.preventDefault();
        console.log("LOGIN WORKING?", this.state);

        axios.post("https://lmabdamudmok.herokuapp.com/api/login/", this.state, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials:false
        })
            .then(res => {
                console.log("handlesubmit...maybe?", res.data);
                localStorage.setItem('jwt', res.data.key)
                if (localStorage.getItem("jwt")) {
                    this.props.history.push('/api/adv/init/');
                }
            })
            .catch(err => {
                console.log("SERVER ERROR FUCK!", err);
            });
        // this.setState({ username:"", password:"" })
    }
    render() {
        return (
            <div>
                <form>
                    <input name="username" placeholder="enter username" value={this.state.username} onChange={this.handleInputChange} />
                    <input name="password" placeholder="enter password" value={this.state.password} onChange={this.handleInputChange} />
                    {/* <button onClick={this.handleInputChange.handleSubmit}>Login</button> */}
                </form>
                <div>
                    <button onClick={this.handleSubmit}>Login</button>
                </div>
            </div>
    );
    }
}
export default Login;

