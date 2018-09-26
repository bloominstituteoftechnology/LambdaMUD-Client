import React, { Component } from 'react';
import {Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }
    inputChangeHandler = (event) => {this.setState({[event.target.name]: event.target.value})}

    submitHandler = event => {
    		event.preventDefault();

        const credentials = { username: this.state.username, password: this.state.password }
        axios.post('https://localhost:8000/api/login/', credentials)
            .then(res => {
            console.log('data', res.data);
            const token = res.data;

            localStorage.setItem('key', token)
                this.props.history.push('/game')
            })
            .catch(err => {
            console.error('Axios falied');
          })
   			console.log('state', this.state)
    }


  render() {
  	return(
  	       <div className="login-container">
           <div>
            <Link to='/'><button className="login-button-back">Back</button></Link>
            </div>

  	       	<h1 className="login-header">Login to Enter</h1>
            <div className="form-container">
  	       	<form className="login-form-container" onSubmit={this.submitHandler}>
                <div className="login-form">
                   <input className="login-form-namebox1"
                    name='username'
                    value={this.state.username}
                    onChange={this.inputChangeHandler}
                    placeholder='username'
                    type="text"
                    />
                </div>
                <div>
                    <input className="login-form-namebox1"
                    name='password'
                    value={this.state.password}
                    onChange={this.inputChangeHandler}
                    placeholder='Password'
                    type="text"
                   />
                </div>
                <div>
                    <Link to="/GameView" ><button className="login-button" type="submit"> Login</button></Link>
                </div>
           			 <div className="reglogin-button-container">
                <div className="register-button">
                    <p className="register-login-context">Hey You!  Wanna Join?</p>
                 </div>
                <div>
                    <Link to="/register"><p className="register-login-button">Sign Up</p></Link>
                </div>
            </div>

            </form>
            </div>
  	       </div>
  	)
	};

};
export default Login;
