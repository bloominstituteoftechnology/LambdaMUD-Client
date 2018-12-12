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

function AuthRedirect(props) {
    function handleSubmit(e) {
        e.preventDefault();
        props.login();
    }

    let isLogged = props.isLogged;
    if (!isLogged) {
        props.history.push("/")

    }

    return (
        <Wrapper>
            <div>
                <h1>You must login to play the game</h1>
            </div>
        </Wrapper>
    )
};

export default AuthRedirect;