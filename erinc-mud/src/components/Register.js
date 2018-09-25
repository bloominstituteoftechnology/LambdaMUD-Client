import React, { Component } from "react";
import "../App.css";
import axios from "axios";
import { Link } from "react-router-dom";


class Register extends Component {
    state = { 
            username: "",
            password1: "",
            password2: "",
            error: false,
            errorMessage: ''
         
    }

    createUser = event => {
        event.preventDefault();
        const user = {
            username: this.state.username,
            password1: this.state.password1,
            password2: this.state.password2            
        };
        axios.post("http://localhost:8000/api/registration/", user).then(response => {
            localStorage.setItem('token', response.data.key)
            this.props.history.push(`/login`)
            // window.location.href = "/"
            this.setState({
                error: false
            });
        })
            .catch(err => {
                console.log(err)
                this.setState({
                    error: true,
                    errorMessage: err.response.data.error
                })
            })
    };

    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };


    render() { 
        return ( 
            <div className="col-sm-6">
                <div className='signup-form-div'>
                    <h2>Sign Up </h2>
                    <div className={this.state.error ? "error" : "hidden"}>
                        {this.state.errorMessage}
                    </div>
                    <div className='signup-form'>
                        <div className="form-group">
                            <input className="form-control" placeholder="Username" name='username' type="text" value={this.state.username} onChange={this.handleInputChange} />
                        </div>
                        <div className="form-group">
                            <input className="form-control" placeholder="Password" name='password1' type="password" value={this.state.password1} onChange={this.handleInputChange} />
                        </div>
                        <div className="form-group">
                            <input className="form-control" placeholder="Re-enter Password" name='password2' type="password" value={this.state.password2} onChange={this.handleInputChange} />
                        </div>
                        <div className='signup-buts'>
                            <button type="submit" className="signup-button" onClick={this.createUser}>
                                Submit
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
 
export default Register;