import React from 'react';
import Styled from 'styled-components';

// Styles

// Main wrapper
const Wrapper = Styled.div`
    width: 30%;
    margin: 80px auto;
    padding-left: 3%;
    color: #fff;
    
`;

/**
 * Renders when the user goes to the /game endpoint without logging in
 * @param props - Props
 * @returns {*}
 * @constructor
 */
function AuthRedirect(props) {

    // Push the user to the homepage if they have not logged in
    let isLogged = props.isLogged;
    if (!isLogged) {
        props.history.push("/")

    }

    // Render the component
    return (
        <Wrapper>
            <div>
                <h1>You must login to play the game</h1>
            </div>
        </Wrapper>
    )
};

export default AuthRedirect;