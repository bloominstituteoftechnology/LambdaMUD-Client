import React from 'react';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }
    render() { 
        return (
            <div className='Login'>Login</div>
        );
    }
}
 
export default Login;