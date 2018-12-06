import React from 'react';

export default class HomeScreen extends React.Component {
    render() {
        
        return (
            <div>
                <div style={{
                    border: "1px solid grey",
                    height: "20vh",
                    width: "30vw",
                    display: "flex",
                    justifyContent: "center"
                    
                }}>The Super Adventure Game</div>
                <button>Login</button>
                <button>Signup</button>
            </div>
        )
    }
}