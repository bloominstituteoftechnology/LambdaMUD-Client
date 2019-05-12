import React from 'react';
import { Route, Link } from 'react-router-dom';


const Login = props => {
    return (
        <div>
            <h1>LambdaMUD Game</h1>
            <form onSubmit = {props.loginSubmitHandler}>
                <div>
                    <input
                        type = 'text'
                        name = 'loginUsername'
                        value = {props.loginUsername} 
                        onChange = {props.inputChangeHandler}
                    />
                </div>
                <div>
                    <input
                        type = 'password'
                        name = 'loginPassword'
                        value = {props.loginPassword} 
                        onChange = {props.inputChangeHandler}
                    />
                </div>
                <div>
                    <button type = 'submit'>Login</button>
                </div>
            </form>
            {props.errorMessage
                    ?
                    <div style={{ marginBottom: '20px', color: 'red', height: '20px' }}>
                        {props.errorMessage}
                    </div>
                    : null
                }
            <div>
                Don't have an account? <Link to = "/register">Register here</Link>
            </div>
            
        </div>
    )
}


export default Login
