import React from 'react';
import { Route, Link } from 'react-router-dom';


const Login = props => {
    return (
        <div style = {{background:'white', width:'300px', padding:'20px'}}>
            <h1>LambdaMUD Game</h1>
            <br/> 
            <form onSubmit = {props.loginSubmitHandler}>
                <div>
                    username: 
                    <input
                        type = 'text'
                        name = 'loginUsername'
                        value = {props.loginUsername} 
                        onChange = {props.inputChangeHandler}
                    />
                </div>
                <div>
                    password:
                    <input
                        type = 'password'
                        name = 'loginPassword'
                        value = {props.loginPassword} 
                        onChange = {props.inputChangeHandler}
                    />
                </div>
                <br/>
                <div>
                    <button type = 'submit'>Login</button>
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
                Don't have an account? <Link to = "/register">Register here</Link>
            </div>
            
        </div>
    )
}


export default Login
