import React from 'react';
import axios from 'axios';


class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password1: "",
      password2: ""
    };
  };

  inputChangeHandler = event => {this.setState({ [event.target.name]: event.target.value});
  };

   submitHandler = () => {
        const credentials = { username: this.state.username, password1: this.state.password1, password2: this.state.password2 }
        if (credentials.password1 === credentials.password2)
        axios.post('https://mylambdamud-project.herokuapp.com/api/registration/', credentials)
            .then(response => {
            const token = response.data;
        		console.log(response)
        		localStorage.setItem('key', token)
        		this.props.history.push('/login')
            })
            .catch(error => {console.log(error.response)
      		});
    	}


    render() {
        return (
            <div className='Register'>
                <h1 className='title'>Create Account Screen</h1>
                <div>
                <input className='input'
	                name='username' value={this.state.username}
	                placeholder='Username'
	                onChange={this.inputChangeHandler}
                />
                </div>
                <div>
                <input className='input'
                	name='password1'
                	value={this.state.password1}
                	placeholder='Password'
                	onChange={this.inputChangeHandler}
                	type='password'
                />
                </div>
                <div>
                <input className='input'
	                name='password2'
	                value={this.state.password2}
	                placeholder='Re-Enter Password'
	                onChange={this.inputChangeHandler}
	                type='password'
                />
                </div>
                <button onClick={this.submitHandler}>Submit</button>
            </div>
        );
    }
}

export default Register;

