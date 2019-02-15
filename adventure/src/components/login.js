import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

 const url = 'https://adventuregame-app.herokuapp.com'

 class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
        }
    }
    handleChange = e => {
        this.setState({[e.target.name]:e.target.value})
    }
    submitInfo = e => {
        e.preventDefault();
        axios
        .post(`${url}/api/login`, this.state)
        .then(res => {
            console.log('response', res)
            const token = res.data['key'];
            localStorage.setItem('token', `${token}`);
            this.props.history.push('/game');
        })
        .catch(err => {
            const error = JSON.stringify(err);
            if (error.includes('401')) {
                this.setState({ status: 401})
            }
        });
    }
    render() {
        return(
            <div className = "login">
                <h1>Enter Your Player Info</h1><br />
                <form onSubmit={this.submitInfo}>
                <input 
                    value={this.state.username}
                    onChange={this.handleChange}
                    type="text"
                    placeholder="Username"
                    name="username"/><br />
                <input 
                    value={this.state.password}
                    onChange={this.handleChange}
                    type="password"
                    placeholder="Password"
                    name="password"/><br />
                <button type="submit">Submit</button>
                </form>
                <p style={ this.state.status === 401 ? 
                { color: "red", textAlign: "center", marginTop: "20px" } : { display: "none" } }>
                Invalid username or password.
               </p>
                <div>
                        <h4>No Player? Create One!</h4>
                        <Link to = {`/registration`}>
                            <button>Create Player</button>
                        </Link>
                    </div>
            </div>
        )
    }
}
 export default Login;