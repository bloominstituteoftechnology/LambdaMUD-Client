import React from 'react';
import { Route, Link } from 'react-router-dom';

// const LoginErrorHandler = props => {
//     return (
//         <div >
//             Error: {props.errorMessage}
//         </div>
//     )
// }

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
            {/* <LoginErrorHandler /> */}

            <div style = {{display:props.loginErrorMessageDisplay}}>
                {props.loginErrorMessage}
            </div>




            <Link to = "/register">Register</Link>
        </div>
    )
}


export default Login
