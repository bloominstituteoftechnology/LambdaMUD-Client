import React, { Component } from 'react';
import {Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'reactstrap';
import './login.css';



class Login extends Component {
        state = {
            username: '',
            password: '',

        }
    inputChangeHandler = event => {
        this.setState({[event.target.name]: event.target.value})
    };

    submitHandler = event => {
        event.preventDefault();

        axios.post('https://mylambdamud-project.herokuapp.com/api/login/', this.state).then(res => {
            console.log(res.data);
            const token = res.data.key;
            localStorage.setItem('key', token);
            this.props.history.push('/GameView')
       		})
        		.catch(err => {console.log(err);

            })
        this.setState({ username: '', password: '' });
    };

    render() {
        return (
          <div className="login-container">
	           <div>
	            <Link to='/'><button className="login-button-back">Back</button></Link>
	            </div>

  	       	<h1 className="login-header">Login to Enter</h1>
            	<div className="form-container">
                		<form onSubmit={this.submitHandler}>
                    	<div>
                        <input
                            value={this.state.username}
                            onChange={this.inputChangeHandler}
                            type="text"
                            placeholder="Name"
                            name="username"/>
                  		</div>
                			<div>
                        <input
                            value={this.state.password}
                            onChange={this.inputChangeHandler}
                            type="password"
                            placeholder="Password"
                            name="password" />
                    	</div>
                    	<div>
               					<button type="submit">Login</button>
                    </div>
                </form>
            </div>
            <div className="reglogin-button-container">
                <div className="register-button">
                    <p className="register-login-context">Hey You!  Wanna Join?</p>
                 </div>
                <div>
                   <Link to="/register"><Button className="register-login-button">Sign Up</Button></Link>
                </div>
            </div>



          </div>

        );
    }
}

export default Login;
