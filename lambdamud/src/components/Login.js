import React, { Component } from 'react';
import {Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';



class Login extends Component {
        state = {
            username: '',
            password: '',
            isLoggedIn: false,
        }

	inputChangeHandler = event => {
        const { username, value } = event.target;
        // console.log('name', name, 'value', value)
        this.setState({ [username]: value });
    }

   submitHandler = event => {
   			event.preventDefault();

   			axios.post('https://mylambdamud-project.herokuapp.com/admin/login/', this.state)
   			 .then(res => {
            console.log('data', res.data);
            const token = res.data;

            localStorage.setItem('jwt', token)
        })
   			.catch(err => {
            console.error('Axios falied');

          })
   			console.log('state', this.state)

   		};


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
                    name='name'
                    value={this.state.name}
                    onChange={this.inputChangeHandler}
                    placeholder='Name'
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
                    <Link to="/game" ><button className="login-button" type="submit"> Login</button></Link>
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
