import React, { Component } from "react";
import "../App.css";
import axios from "axios";
import { Link } from "react-router-dom";


class Login extends Component {
    state = {
        username: '',
        password: '',
        error: false,
        errorMessage: ''
    }

    login = (event) => {
        axios.post("http://localhost:8000/api/login/", this.state)
            .then(response => {
                console.log(response)
                    localStorage.setItem('token', `Token ${response.data.key}`);
                    localStorage.setItem('username', this.state.username);
                    this.setState({
                        error: false
                });
                // this.props.history.push('/');
                window.location.href = "/"
            })
            .catch(err => {
                console.log(err)
                this.setState({
                    error: true,
                    errorMessage: err.message
                })
            })
    }

    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };
    


    render() {
        console.log(localStorage)
        return (
            <div className="col-sm-6">
                <div className='signup-form-div'>
                    <h2> Login </h2>
                    <div className={this.state.error ? "error" : "hidden"}>
                        {this.state.errorMessage}
                    </div>
                    <div className='signup-form'>
                        <div className="form-group">
                            <input className="form-control" placeholder="Username" name='username' type="text" value={this.state.username} onChange={this.handleInputChange} />
                        </div>
                        <div className="form-group">
                            <input className="form-control" placeholder="Password" name='password' type="password" value={this.state.password} onChange={this.handleInputChange} />
                        </div>
                        <div className='signup-buts'>
                            <button type="submit" className="signup-button" onClick={this.login}>
                                Login
                            </button>
                            <Link to="/">
                                <button className="home-button">
                                    Home
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;