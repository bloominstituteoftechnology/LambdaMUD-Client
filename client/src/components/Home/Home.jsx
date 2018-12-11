import React from 'react';
import Styled from "styled-components";
import {NavLink} from "react-router-dom";

// Styled components for styling HTML elements

// Banner image
const Banner = Styled.div`
    height: 300px;
    background-color: #333;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

// Button
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

// Div to format button positions
const BannerButtons = Styled.div`
    display: flex;
    margin-left: -5%;
`;

// Paragraph
const P = Styled.div`
    margin: 10px 2% 2% 2%;
    color: #fff;
`;

// Copyright/Created by text
const Copyright = Styled.div`
    margin-top: 40px;
    margin-left: -5%;
    color: #fff;
`;

/**
 * Renders the Home page view
 * @returns {*}
 * @constructor
 */
function Home() {
    return (
        <Banner>
            <img src={require("./logo2.png")} alt="logo"/>
            <BannerButtons>
                <NavLink to="/login"><Button>Play Now</Button></NavLink>
                <P>Or</P>
                <NavLink to="/register"><Button>Register</Button></NavLink>
            </BannerButtons>
            <Copyright>
                <p>Created by: Jeremy Boggs</p>
            </Copyright>
        </Banner>
    )
};

export default Home;