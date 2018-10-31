import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password1: '',
            password2: '',
            password1Tag: 'Show',
            password2Tag: 'Show',
            password1State: 'password',
            password2State: 'password'
        }
    }

    changeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    password1Toggle = () => {
        this.state.password1Tag === 'Show' ? this.setState({password1Tag: 'Hide'}) : this.setState({password1Tag: 'Show'})
        this.state.password1State === 'password' ? this.setState({password1State: 'text'}) : this.setState({password1State: 'password'})
    }

    password2Toggle = () => {
        this.state.password2Tag === 'Show' ? this.setState({password2Tag: 'Hide'}) : this.setState({password2Tag: 'Show'})
        this.state.password2State === 'password' ? this.setState({password2State: 'text'}) : this.setState({password2State: 'password'})
    }

    submitRegister = (event) => {
        event.preventDefault();
        if (this.state.password1 === this.state.password2) {
            axios.post('https://lambdamud-ghr.herokuapp.com/api/registration/', {
                username: this.state.username, 
                password1: this.state.password1, 
                password2: this.state.password2
            })
            .then(response => {
                console.log(response.data)
                this.props.login(response.data.key, this.state.username)
            })
            .catch(error => {
                console.log(error.response)
                alert(error.response.data.error)
            })
            this.props.history.push('/');
        } else {
            alert('The passwords do not match.')
        }
    }

    render() {
        return (
            <div className="registerBody">
                
                <h1>Please register</h1>
                <form onSubmit={this.submitRegister} className="registerForm">
                    <div><input type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.changeHandler}></input></div>
                    <div>
                        <input type={this.state.password1State} name="password1" placeholder="Password" value={this.state.password1} onChange={this.changeHandler}></input>
                        <button onClick={this.password1Toggle} type="button">{this.state.password1Tag}</button>
                    </div>
                    <div>
                        <input type={this.state.password2State} name="password2" placeholder="Password again" value={this.state.password2} onChange={this.changeHandler}></input>
                        <button onClick={this.password2Toggle} type="button">{this.state.password2Tag}</button>
                    </div>
                    <button type="submit">Submit</button>
                </form>
                <h1>Log in instead</h1>
                <Link to="/login">Log in</Link>
            </div>
        )

    }
    
}

export default Register;