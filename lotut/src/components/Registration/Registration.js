import React, { Component } from 'react';
import './index.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Registration extends Component {

    state = {
        username: '',
        password1: '',
        password2: '',
    }


    render() {
        return (
            <form onSubmit={this.register} className="regForm">
        <div className="regOverlay">
            <div className="greeting">Welcome!</div>
            <br /><br />
            <div>
                <input
                    className="styledInput"
                    name= "username" 
                    value={this.state.username} 
                    onChange={this.handleChange} 
                    type="text"
                    placeholder="Username"
                />
            </div>
            <div>
                <input 
                    className="styledInput"
                    name="password1" 
                    value={this.state.password1}
                    onChange={this.handleChange}
                    type ="password"
                    placeholder="Password"
                />
                <input 
                    className="styledInput"
                    name="password2" 
                    value={this.state.password2}
                    onChange={this.handleChange}
                    type ="password"
                    placeholder="Password again"
                />
            </div>
            
            <div>
                <button 
                    className="regButton"
                    type="submit" 
                    >Connect
                </button>
            </div>
                <Link to="/" className="alt">login </Link>
            </div>
        </form>
        );
        }

        handleChange = event => {
            const {name, value} = event.target;
            this.setState({ [name]: value })
        }

        register = event => {
            event.preventDefault();   

            if(this.state.username === '' || this.state.password1 === '' || this.state.password2 === ''){
                console.log("All Fields Required")
                return;
            }

            if(this.state.password1 !== this.state.password2){
                console.log("Passwords Do Not Match")
                return;
            }

    
            axios
                .post('http://localhost:8000/api/registration', this.state)
                .then(res => {
                    // localStorage.removeItem('jwt');
                    console.log(res.data.key);
                    localStorage.setItem('key', res.data.key);
                    if (localStorage !== 'key'){
                    this.props.history.push('/game')
                }
                })
                .catch(err => {
                    console.log(err, 'err')
                    this.props.history.push('/')
        });
    
        };

    }
    
export default Registration;
    