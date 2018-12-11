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

function Login(props) {
    function handleSubmit(e) {
        e.preventDefault();
        props.login();
    }

    let isLogged = props.isLoggedIn;
    if (isLogged) {
        props.getUser();
        props.history.push('/')
    }
    return (
        <Wrapper>
            {
                !isLogged ? <form onSubmit={handleSubmit}>
                    <p className="h4 mb-4">Login</p>
                    <input type="text" placeholder="Username" autoComplete="username" name="username" id="defaultFormContactNameEx1" className="form-control" defaultValue={props.user.username} onChange={props.handleChange} />
                    <br />
                    <input type="password" autoComplete="current-password" placeholder="Password" name="password" id="defaultFormContactNameEx2" className="form-control" value={props.user.password} onChange={props.handleChange} />
                    <Error>{props.localError !== '' ? props.localError : props.error}</Error>
                    <br/>
                    <Button type="button" onClick={handleSubmit}>Login</Button>
                    <br/><br/>
                    <p>Don't have an account? <NavLink to="/register" onClick={props.clearError}>Register</NavLink> for one!</p>
                </form> : <P>You have successfully logged in</P>
            }
        </Wrapper>
    )
};

export default Login;