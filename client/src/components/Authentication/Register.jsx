import React from 'react';
import { NavLink } from 'react-router-dom';
import Styled from 'styled-components';

const Wrapper = Styled.div`
    width: 30%;
    margin: 80px auto;
    padding-left: 3%;
    color: #fff;

    input {
        width: 400px;
        margin-bottom: 20px;
        height: 40px;
    }

    textarea {
        height: 500px;
    }
    
    h3 {
        font-size: 16px;
        color: #E7A837;
    }
    
`;

const Button = Styled.button`
    width: 160px;
    height: 40px;
    cursor: pointer;
    font-size: 16px;
    border: 1px solid #E7A837;
    border-radius: 20px;
    background-color: #E7A837;
    
    &:hover {
        background-color: #fff;
    }
`;

const Error = Styled.p`
    color: red;
`;

const P = Styled.p`
    color: #4a494a;
    font-size: 20px;
    margin-left: 3%;
`

function Register(props) {
    function handleSubmit(e) {
        e.preventDefault();
        props.userRegister();
    }

    let isLogged = props.isLoggedIn;
    return (
        <Wrapper>
            {
                !isLogged ? <form onSubmit={handleSubmit}>
                    <h1>Register Account</h1>
                    <h3>Username</h3>
                    <input type="text" placeholder="Username" autoComplete="username" name="username" id="defaultFormContactNameEx2" value={props.user.username} onChange={props.handleChange} />
                    <br/>
                    <h3>Email Address</h3>
                    <input type="text" placeholder="Email" name="email" id="defaultFormContactNameEx1" defaultValue={props.user.email} onChange={props.handleChange} />
                    <br />
                    <h3>Password</h3>
                    <input type="password" autoComplete="new-password" placeholder="Password" name="password" id="defaultFormContactNameEx3" value={props.user.password} onChange={props.handleChange} />
                    <br />
                    <h3>Confirm Password</h3>
                    <input type="password" autoComplete="new-password" placeholder="Confirm Password" name="password2" id="defaultFormContactNameEx4" value={props.user.password2} onChange={props.handleChange} />
                    <Error>{props.localError !== '' ? props.localError : props.error}</Error>
                    <br/>
                    <Button type="button" onClick={handleSubmit}>Register</Button>
                    <br/><br/>
                    <p>Already have an account? <NavLink to="/login" onClick={props.clearError}><Button type="button">Login</Button></NavLink></p>
                </form> : <P>Thank you for registering!</P>
            }

        </Wrapper>
    )
}

export default Register;