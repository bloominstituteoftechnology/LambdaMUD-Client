import React, { Component } from 'react';
import './index.css';
import { Link } from 'react-router-dom';


class Registration extends Component {

    state = {
        username: '',
        password: '',
        verify: '',
    }


    render() {
        return ( //if !this.state.verify esc, if this.state.verify esc === this.state.password continue
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
                    type ="text"
                    placeholder="Username"
                />
            </div>
            <div>
                <input 
                    className="styledInput"
                    name="password" 
                    value={this.state.password}
                    onChange={this.handleChange}
                    type ="password"
                    placeholder="Password"
                />
                <input 
                    className="styledInput"
                    name="verify" 
                    value={this.state.verify}
                    onChange={this.handleChange}
                    type ="password"
                    placeholder="Password again"
                />
            </div>
            
            <div>
                
                <button 
                    className="regButton"
                    // value={this.state.password} 
                    onChange={null} 
                    type="submit" 
                    >Connect</button>
                
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
            
            if(this.state.username === '' || this.state.password === ''){
                return;
            }
    
            axios
                .post('http://localhost:5000/register', this.state)
                .then(res => {
                    localStorage.removeItem('jwt');
                    console.log(res.data);
                    // if(this.state.username != '' || this.state.password != ''){
                    localStorage.setItem('jwt', res.data.token);
                //};
                    if (localStorage !== 'jwt'){
                    this.props.history.push('/notes')
                }
                })
                .catch(err => {
                    console.log(err, 'err')
                    this.props.history.push('/')
        });
    
        };

    }
    
export default Registration;
    