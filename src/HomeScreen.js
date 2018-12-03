import React, { Component } from 'react';
import { Button } from 'reactstrap';
import './App.css';
import dungeon from './dungeonGenesis.png';



class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const divStyle = {
            backgroundImage: `url(${dungeon})`,
            backgroundSize: "100%",
            backgroundRepeat: "no-repeat",
            height: "100vh",
            width: "100vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center"
        }
        
        return (
            <div>
                <div style={divStyle}>
                    <Button>Signup</Button>
                    <Button>Login</Button>
                </div>
            </div>
        )
    }
}

export default HomeScreen;


