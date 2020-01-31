import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import styled from 'styled-components';

const Home = props => {
    return (
        <HomeContainerStyledDiv>
            <h1>Welcome to Adrian's LambdaMUD Adventure game</h1>

            <div>
                <Link to = "/login">
                    <button>Login</button>
                </Link>
            </div>

            <div>
                <Link to = "/register">
                    <button>Register</button>
                </Link>
            </div>

        </HomeContainerStyledDiv>
    )
}

const HomeContainerStyledDiv = styled.div`
  width: 900px;
  border: 1px solid red;
  margin-left:10px;
  margin-right:10px;
`

export default Home;
