import React from 'react';
import { Link } from 'react-router-dom';

const Register = props => {
    return (
        <div style = {{background:'white', width:'300px', padding:'20px'}}>
            <h1>Register Form</h1>
            <br/>
            <form onSubmit = {props.registerSubmitHandler}>
                <div>
                    username: 
                    <input
                        type = 'text'
                        name = 'registerUsername'
                        value = {props.registerUsername} 
                        onChange = {props.inputChangeHandler}
                    />
                </div>
                <div>
                    password:
                    <input
                        type = 'password'
                        name = 'registerPassword1'
                        value = {props.registerPassword1} 
                        onChange = {props.inputChangeHandler}
                    />
                </div>
                <div>
                    re-enter pw:
                    <input
                        type = 'password'
                        name = 'registerPassword2'
                        value = {props.registerPassword2} 
                        onChange = {props.inputChangeHandler}
                    />
                </div>
                <br/>
                <div>
                    <button type = 'submit'>Register</button>
                </div>
                <br/>             
            </form>
            {props.errorMessage
                    ?
                    <div style={{ marginBottom: '20px', color: 'red', height: '20px' }}>
                        {props.errorMessage}
                    </div>
                    : null
                }    
            <div>
                Already have an account? <Link to = "/login">Login here</Link>
            </div>
        </div>
    )
}


export default Register