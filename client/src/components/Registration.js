import React, { Component } from 'react';

class Resgistration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password1: '',
            password2: ''
        }
    }
    render() { 
        return (
            <div className='Resgistration'>Resgistration</div>
        );
    }
}
 
export default Resgistration;