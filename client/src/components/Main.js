import React from 'react';
import styled from 'styled-components';
import { injectGlobal } from 'styled-components';
import axios from 'axios';
import background from '../images/background.jpg';
import logo from '../images/logo2.png';
import NavBar from './Nav/Navbar';
import Container from './Content/Container';


injectGlobal`
    body {
        background-image: url(${background});
        background-size: cover;
    }
`

const Div = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    margin: 0;
    padding: 0
`

const Header = styled.div`
    height: 20%;
`

const Content = styled.div`
    height: 80%;
`

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    componentDidMount() {
        const token = localStorage.getItem('lambda-token');
        if (!token) {
            this.props.history.replace('/login')
        }

    }

    render() { 
        return ( 
            <Div>
                <Header>
                    <NavBar />
                    <img src={logo} alt="LambdaMUD"/>
                </Header>
                <Content>
                    <Container/>
                </Content>
            </Div>
         );
    }
}

export default Main;