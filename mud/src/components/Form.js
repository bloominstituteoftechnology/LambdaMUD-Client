import React from 'react';
import './Form.css';

class Form extends React.Component {
    constructor(props){
        super()

        this.state = {
            username: "",
            password1: "",
            password2: ""
        }
    }

    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
      };

    handleRegister = (e) => {
        e.preventDefault()
        if (this.state.password1 !== this.state.password2) {
          alert("Passwords do not match")
        }
        else {
          this.props.register({
            "username": this.state.username,
            "password1": this.state.password1,
            "password2": this.state.password2
          })
        }
        this.setState({
          username: "",
          password1: "",
          password2: ""
        })
      }

    handleSignIn = (e) => {
        e.preventDefault()
        this.props.login({
          "username": this.state.username,
          "password": this.state.password1
        })
        this.setState({
          username: "",
          password1: ""
        })
      }    
    

    render(){
        return(
            <div className="form-wrapper">
                <h1>{this.props.Registered ? "Sign In" : "Create User"}</h1>
                <form className="form" onSubmit={this.props.Registered ? this.handleSignIn : this.handleRegister}>
                    <div className="form-inputs">
                    <input type="text" onChange={this.handleInputChange} name="username" value={this.state.username} placeholder="Username" />
                    <input type="password" onChange={this.handleInputChange} name="password1" value={this.state.password1} placeholder="Password" />
                    <input className = {this.props.Registered ? "hide" : "unhide"}type="password" onChange={this.handleInputChange} name="password2" value={this.state.password2} placeholder = "Confirm Password" />
                    </div>
                    <button className="form-button">Connect</button>
                </form>
                <button className={this.props.Registered ? "signup-button" : "hide"} onClick = {this.props.registeredOff}>Sign Up</button>
            </div>
         
        );
    }
}

export default Form; 