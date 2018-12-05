import React from 'react';
import gameScreen from './dungeonGenesis.png';

export default class GameScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const backgroundStyle = {
            backgroundImage: `url(${gameScreen})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100%",
            height: "100vh",
            width: "100vw",
            display: "flex"
        }
        return (
        <div style={backgroundStyle}>
          
        </div>
        )
    }
}