import React, { Component } from 'react';
import '../Registration/index.css';
import { Link } from 'react-router-dom';
import axios from 'axios';



class Login extends Component {

    state = {
        username: '',
        password: ''
    }
    
    render() {
        return (
            <form onSubmit={this.login} className="regForm">
            
            <div className="regOverlay">
                <div className="greeting">Login</div>
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
                </div>
                <div>
                    <button className="regButton">
                        Connect
                    </button>
                </div>
                    <Link to="/register" className="alt">register</Link>
                </div>
                
            </form>
        );
    }

    handleChange = event => {
        const {name, value} = event.target;
        this.setState({ [name]: value })
    }


    login = event => { 
        event.preventDefault();  
        
        if(this.state.username === '' || this.state.password === ''){
            localStorage.removeItem('jwt');
            return;
        }
        
        
        axios
            .post('https://lotut.herokuapp.com/api/login', this.state)
            .then(res => {
                console.log(res.data);
                // localStorage.removeItem('jwt');
                localStorage.setItem('key', res.data.key);
                // if (this.state.password != ''){
                this.props.history.push('/game')
            //}
            })
            .catch(err => {
                console.log(err, 'err')
                this.props.history.push('/register')
    });

    };
    

}




export default Login;