import React from 'react';

const Login = props => {
    return (
        <div>
            <h1>Login Form</h1>
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
        </div>
    )
}


export default Login
