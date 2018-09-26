import React, { Component } from 'react';
import { connect } from 'react-redux';
import userLogin from '../Reducers/';

function mapStateToProps(state) {
    return {

    };
}

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
        }
    }

changeHandler = (e) => {
this.setState({
    [e.target.name]: e.target.value
})

}
    render() {
        return (
            <React.Fragment>
            <form onSubmit = {this.props.userLogin}>
                <input isRequired type="text" onChange = {this.changeHandler} value = {this.state.username} name='username'/>
                <input isRequired type="password" name='password'/>
                <button type="submit">Login</button>
            </form>
            </React.Fragment>
        );
    }
}

export default connect(
    mapStateToProps, userLogin
)(Login);