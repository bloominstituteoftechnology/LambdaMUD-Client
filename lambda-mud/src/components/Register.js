import React from 'react';
import { createUser } from './../actions';
import { connect } from 'react-redux';
import Styled from 'styled-components';




class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password1: '',
            password2: ''
        }
    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit = event => {
        event.preventDefault();
        const user = this.state;
        this.props.createUser(user, this.props.history);
        this.setState({username: '', password1: '', password2: ''})

    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type='text'
                        name='username'
                        placeholder='username'
                        value={this.state.username}
                        onChange={this.handleChange}
                    />
                    <input
                        type='password'
                        name='password1'
                        placeholder='password'
                        value={this.state.password1}
                        onChange={this.handleChange}
                    />
                    <input
                        type='password'
                        name='password2'
                        placeholder='confirm password'
                        value={this.state.password2}
                        onChange={this.handleChange}
                    />
                    <button>Register</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      users: state.users
    }
  }
  
  const mapActionsToProps = {
    createUser: createUser,
  }
  export default connect( mapStateToProps, mapActionsToProps)(Register);