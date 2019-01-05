import React from 'react'
import "./app.css";
import Axios from 'axios'

// Register form

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            password1:'',
            password2:''
        }
    }
    

    handleChange = e => {
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        const {username,password1,password2} = this.state;
        Axios.post('https://jmcadvproject.herokuapp.com/api/registration/',{username,password1,password2})
        .then(result => {
            console.log(result)
            localStorage.setItem('jwt',result.data.key);
            if(localStorage.getItem('jwt')) {
                this.props.history.push('/');
            }

        }).catch(err => console.log(err));
    }

    render() {
        return (
            <div className = "register-container">
           
            <form className = "register-form" onSubmit = {this.handleSubmit}>
            <h3>
                Register
            </h3>
                <input  placeholder = "username"
                        name = "username"
                        type = "text"
                        onChange = {this.handleChange}
                        value = {this.state.username}
                />
                <input  placeholder = "password"
                        name = "password1"
                        type = "text"
                        value = {this.state.password}
                        onChange = {this.handleChange}
                />

                <input  placeholder = "password again"
                        name = "password2"
                        type = "text"
                        value = {this.state.passwordConfirm}
                        onChange = {this.handleChange}
                />
                <button>Submit</button>
            </form>

            </div>
        )
    }
}