import React from 'react';
import { NavLink } from 'react-router-dom';
import Styled from 'styled-components';

const Wrapper = Styled.div`
    width: 50%;
    margin-top: 80px;
    padding-left: 3%;
    color: #4a494a;

    input {
        width: 400px;
    }

    textarea {
        height: 500px;
    }
`;

const Button = Styled.button`
    width: 30%;
    height: 60px;
    background-color: #2ac0c4;
    color: white;
    border: 1px solid #969696;
    cursor: pointer;
    margin-top: 20px;
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
                    <p className="h4 mb-4">Register Account</p>
                    <input type="text" placeholder="Email" name="email" id="defaultFormContactNameEx1" className="form-control" defaultValue={props.user.email} onChange={props.handleChange} />
                    <br />
                    <input type="text" placeholder="Username" autoComplete="username" name="username" id="defaultFormContactNameEx2" className="form-control" value={props.user.username} onChange={props.handleChange} />
                    <br/>
                    <input type="password" autoComplete="new-password" placeholder="Password" name="password" id="defaultFormContactNameEx3" className="form-control" value={props.user.password} onChange={props.handleChange} />
                    <br />
                    <input type="password" autoComplete="new-password" placeholder="Confirm Password" name="password2" id="defaultFormContactNameEx4" className="form-control" value={props.user.password2} onChange={props.handleChange} />
                    <Error>{props.localError !== '' ? props.localError : props.error}</Error>
                    <br/>
                    <Button type="button" onClick={handleSubmit}>Register</Button>
                    <br/><br/>
                    <p>Already have an account? <NavLink to="/login" onClick={props.clearError}>Login</NavLink> in and view your notes!</p>
                </form> : <P>Thank you for registering!</P>
            }

        </Wrapper>
    )
}

export default Register;