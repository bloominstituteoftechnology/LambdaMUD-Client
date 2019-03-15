import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import './Navbar.css';

const Button = styled.button`
  height: 100px;
  width: 200px;
  text-decoration: none;
  border-radius: 5px;
  font-size: 1.5rem;
  font-weight: 700;
  background: teal;
  color: white !important;
  border: none;
  margin: 1rem auto;
  &:hover {
    backgound: white;
    color: teal;
    cursor: pointer;
  }
`;



class Navbar extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div style={{
                    position:'fixed',
                    top: '0',
                    left: '0',
                    width: '100%',
                    display: 'flex',
                    background: 'teal',
                    fontSize: "1.5rem"
                }}
            >
                <h1 style={{
                        color:'white',
                        padding: '0.5% 1%',
                        width: '70%',
                    }}
                >
                    LambdaMUD
                </h1>
                <div style={{ width: '30%', display: 'flex', alignItems: "center", textDecoration: 'none' }}>
                    <Button className={this.props.loggedIn === true ? 'none' : 'active' }>
                        <Link to='/registration' style={{padding: '1rem', textDecoration:'none', background: "teal", color: 'white'}}>
                            Register
                        </Link>
                    </Button>
                    <Button className={this.props.loggedIn === true ? 'none' : 'active' }>
                        <Link to='/login' style={{padding: '1rem', textDecoration:'none', background: "teal", color: 'white' }}>
                            Login
                        </Link>
                    </Button>
                    <Button style={{ border: 'none', color:'blue', background:'teal' }} onClick={this.props.logout} className={this.props.loggedIn === true ? 'active' : 'none' }>
                        Logout
                    </Button>
                </div>
            </div>
        )
    }
};

export default Navbar;