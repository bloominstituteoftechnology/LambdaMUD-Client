import React, { Component } from 'react';
import { connect } from 'react-redux';
import userRegister from '../Reducers/';
import './components.css'

function mapStateToProps(state) {
    return {
    chat: state.chat
    };
}

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
        }
    }

changeHandler = (e) => {
e.preventDefault();
this.setState({
    [e.target.name]: e.target.value
})

}
    render() {
        let credentials = {
            username: this.state.username,
            password: this.state.password
        }
        return (
            <React.Fragment>
            <div className='main'>
            <form className='form-wrapper' onSubmit = {(e)=>{this.props.userRegister(e, credentials)}}>
                <input className='custominput' required type="text" onChange = {this.changeHandler} name='username' value={this.state.username} />
                <input className='custominput' required type="password" name='password' onChange = {this.changeHandler} value={this.state.password}/>
                <button className='register-button'>Register</button>
            </form>
            </div>
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps,
userRegister
)(Register);