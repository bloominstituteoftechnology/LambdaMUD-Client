import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

const Nav = styled.div`
    height: 30px;
    // width: 100%;
    font-family: 'Lora', Serif;
    font-Size: 14px;
    background: rgba(220, 220, 220, .2);
    // box-shadow: 0 10px 20px rgba(0,0,0,0.16), 0 6px 6px rgba(45,45,45,0.23);
    display: flex;
    justify-content: space-evenly;
    border-radius: 5px;
    align-items: center;
    padding: 0 10px;
    font-size: 16px;
    color: rgba(76, 89, 97, 1);
    font-weight: bold;
`

const Button = styled.button`
    background-color: lightblue;
    border: None;
    cursor: pointer;
    
    padding: 0;
    height: 100%;
    color: rgba(256, 256, 256, 1);
    font-weight: bold;
    font-size: 16px
    &:hover {
        color: rgba(240, 240, 240, 1);
        transform: scale(1.1)
    }
`

class NavBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    handleLogout= () => {
        localStorage.removeItem('mdtkn');
        this.props.history.push('/login');
    }

    render() {
        return ( 
            <Nav>
                Hello, {this.props.username}
                <Button onClick={this.handleLogout}>Logout</Button>
            </Nav>
         );
    }
}


export default withRouter(NavBar);