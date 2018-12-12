import React from 'react';
import { NavLink } from 'react-router-dom';
import Styled from 'styled-components';

// Styles

// Main wrapper
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

// Buttons
const Button = Styled.button`
    width: 160px;
    height: 40px;
    cursor: pointer;
    font-size: 16px;
    border: 1px solid #E7A837;
    border-radius: 20px;
    background-color: #E7A837;
    color: #000;
    
    &:hover {
        background-color: #fff;
    }
`;

// Error to display on form
const Error = Styled.p`
    color: red;
`;

// Paragraph
const P = Styled.p`
    color: #4a494a;
    font-size: 20px;
    margin-left: 3%;
`

/**
 * Render the Login
 * @param props - Props
 * @returns {*}
 * @constructor
 */
function Login(props) {

    /**
     * Logs the user in
     * @param e - Event
     */
    function handleSubmit(e) {
        e.preventDefault();
        props.login();
    }

    /**
     * Sends the user to the game endpoint after successful login
     */
    function sendGame() {
        props.history.push('/game');
    }

    // If the user has logged in, get the user's details and wait 3 seconds
    // and then send them to the game window
    let isLogged = props.isLoggedIn;
    if (isLogged) {
        props.getUser();
        setTimeout(sendGame, 3000);
    }

    // Render the component
    return (
        <Wrapper>
            {
                !isLogged ? <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <h3>Username</h3>
                    <input type="text" placeholder="Username" autoComplete="username" name="username" id="defaultFormContactNameEx1" defaultValue={props.user.username} onChange={props.handleChange} />
                    <br />
                    <h3>Password</h3>
                    <input type="password" autoComplete="current-password" placeholder="Password" name="password" id="defaultFormContactNameEx2" value={props.user.password} onChange={props.handleChange} />
                    <Error>{props.localError !== '' ? props.localError : props.error}</Error>
                    <br/>
                    <Button type="button" onClick={handleSubmit}>Connect</Button>
                    <br/><br/>
                    <p>Don't have an account? <NavLink to="/register" onClick={props.clearError}><Button type="button">Register</Button></NavLink></p>
                </form> : <P>You have successfully logged in. Redirecting...</P>
            }
        </Wrapper>
    )
};

export default Login;