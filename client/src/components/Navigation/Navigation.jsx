import React, { Component } from 'react';
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
    border-bottom: 1px  solid white;
    
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
`;

function Navigation(props) {
    return (
        <Wrapper>
            <Items>
                <P>About</P>
                <P>FAQ</P>
            </Items>
        </Wrapper>
    )
};


export default Navigation;