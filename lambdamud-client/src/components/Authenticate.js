import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Authenticate = App => 
    class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                username: '',
                password: '',
                passwordState: 'password',
                passwordTag: 'Show'
            }
        }

        changeHandler = (event) => {
            this.setState({[event.target.name]: event.target.value})
        }

        passwordToggle = () => {
            this.state.passwordTag === 'Show' ? this.setState({passwordTag: 'Hide'}) : this.setState({passwordTag: 'Show'})
            this.state.passwordState === 'password' ? this.setState({passwordState: 'text'}) : this.setState({passwordState: 'password'})
        }

        handleLogin = (event) => {
            event.preventDefault();
            axios.post('https://lambdamud-ghr.herokuapp.com/api/login/', {
                username: this.state.username,
                password: this.state.password
            })
            .then(response => {
                this.props.login(response.data.key, this.state.username)
                if (response.data.key) {
                    this.props.history.push('/game');
                }
            })
            .catch(error => {
                console.log(error.response)
                alert(error.response.data.error)
            })
        }

        render() {
            return (
                <div className="loginBody">
                    
                    <h1>Please log in</h1>
                    <form onSubmit={this.handleLogin} className="loginForm">
                        <div><input type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.changeHandler} /></div>
                        <div>
                            <input type={this.state.passwordState} name="password" placeholder="Password" value={this.state.password} onChange={this.changeHandler}/>
                            <button type="button" onClick={this.passwordToggle}>{this.state.passwordTag}</button>
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                    <h1>Register instead</h1>
                    <Link to="/register">Register</Link>
                </div>
            )
        }
    }

export default Authenticate;