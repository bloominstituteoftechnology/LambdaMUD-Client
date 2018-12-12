import React from 'react';
import { NavLink } from 'react-router-dom';
import Styled from 'styled-components';

// Styles

// Main wrapper
const Wrapper = Styled.div`
    position: fixed;
    top: 0;
    display: flex;
    justify-content: flex-end;
    
    height: 50px;
    width: 100%;
    background-color: #212122;
    border-bottom: 3px  solid #E7A837;
    
    color: #E7A837;
`

// Links
const Items = Styled.div`
    display: flex;
    justify-content: space-evenly;
    padding-right: 2%;
`;

// Paragraph
const P = Styled.p`
    margin-right: 20%;
    cursor: pointer;
    
    a:link {
        color: orange;
    }
`;

// Logo header
const Logo = Styled.div`
    position: fixed;
    left: 2%;
    top: -10px;
    h1 {
        font-size: 26px;
    }
`;

/**
 * Render the Navigation bar
 * @param props - Props
 * @returns {*}
 * @constructor
 */
function Navigation(props) {
    // Get the key from localstorage if we have and set if the user is logged in already or not.
    let isLogged = false;
    if (localStorage.getItem('key')) {
        isLogged = true;
    } else {
        isLogged = false;
    }

    // Render the component
    return (
        <Wrapper>
            <Logo>
                <NavLink to="/" style={{ textDecoration: "none", color: "#E7A837"}}><h1>Tales of Tacronora</h1></NavLink>
            </Logo>

            <Items>
                <P>About</P>
                <P>FAQ</P>
                {isLogged ? <NavLink to="/" onClick={props.logout} style={{ textDecoration: 'none', color: '#E7A837' }}><P>Logout</P></NavLink> : null }
            </Items>
        </Wrapper>
    )
};


export default Navigation;