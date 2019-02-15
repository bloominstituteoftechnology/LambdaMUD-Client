import React from 'react';
import axios from 'axios';

 const url = 'https://adventuregame-app.herokuapp.com'

 class Registration extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password1: '',
            password2: '',
        }
    }
    handleChange = e => {
        this.setState({[e.target.name]:e.target.value})
    }
    submitInfo = e => {
        e.preventDefault();
        axios
        .post(`${url}/api/registration`, this.state)
        .then(res => {
            console.log('response', res)
            const token = res.data['key'];
            localStorage.setItem('token', `${token}`);
            this.props.history.push('/game');
        })
        .catch(err => {
            console.log('Axios error:', err);
        });
    }
    
    render(){
        return(
            <div className = "register">
                <h1>Create Your Player</h1><br />
                <form  onSubmit={this.submitInfo}>
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
                    name="password1"/><br />
                <input 
                    value={this.state.password}
                    onChange={this.handleChange}
                    type="password"
                    placeholder="Re-enter Password"
                    name="password2"/><br />
                <button type="submit">Get Started</button>
                </form>
            </div>
        )
    }
}
 export default Registration;