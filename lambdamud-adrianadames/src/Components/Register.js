import React from 'react';

const Register = props => {
    return (
        <div>
            <h1>Register Form</h1>
            <form onSubmit = {props.registerSubmitHandler}>
                <div>
                    <input
                        type = 'text'
                        name = 'registerUsername'
                        value = {props.registerUsername} 
                        onChange = {props.inputChangeHandler}
                    />
                </div>
                <div>
                    <input
                        type = 'password'
                        name = 'registerPassword1'
                        value = {props.registerPassword1} 
                        onChange = {props.inputChangeHandler}
                    />
                </div>
                <div>
                    <input
                        type = 'password'
                        name = 'registerPassword2'
                        value = {props.registerPassword2} 
                        onChange = {props.inputChangeHandler}
                    />
                </div>
                <div>
                    <button type = 'submit'>Register</button>
                </div>
                {props.errorMessage
                    ?
                    <div style={{ marginBottom: '20px', color: 'red', height: '20px' }}>
                        {props.errorMessage}
                    </div>
                    : null
                }                
            </form>
        </div>
    )
}


export default Register