import React from 'react';
import Register from './Register';
import Button from '@material-ui/core/Button';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      register: false
    };
  }

  registerChange = () => {
    this.setState(prev => {
      return {register: !prev.register}
    })
  }

  render() {
    return (
      <div>
        {this.state.register ? (
          <Register registerChange = {this.registerChange} />
        ) : (
          <div>
            Blah, blah, blah login details
            <Button variant="contained" color="primary" onClick={this.registerChange}>Register</Button>
          </div>
        )}
      </div>
    );
  }
}

export default Login;
