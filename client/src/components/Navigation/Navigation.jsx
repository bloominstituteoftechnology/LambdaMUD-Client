import React from 'react';
import { NavLink } from 'react-router-dom';
import Styled from 'styled-components';

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

const Items = Styled.div`
    display: flex;
    justify-content: space-evenly;
    padding-right: 2%;
`;

const P = Styled.p`
    margin-right: 20%;
    cursor: pointer;
    
    a:link {
        color: orange;
    }
`;

const Logo = Styled.div`
    position: fixed;
    left: 2%;
    top: -10px;
    h1 {
        font-size: 26px;
    }
`;

function Navigation(props) {
    let isLogged = false;
    if (localStorage.getItem('key')) {
        isLogged = true;
    } else {
        isLogged = false;
    }
    return (
        <Wrapper>
            <Logo>
                <h1>Tales of Tacronora</h1>
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