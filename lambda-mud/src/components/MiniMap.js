import React, { Component } from 'react';
import styled from 'styled-components';

const Room = styled.div.attrs({
    left: props => props.xPosition,
    bottom: props => props.yPosition,
})`
    background-color: white;
    color: black;
    width: 27.7px;
    height: 27.7px;
    border: .5px solid black;
    position: absolute;
    left: ${props => props.left};
    bottom: ${props => props.bottom};
`;

class MiniMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coordsList: [],
            mapLength: 201,
            roomLength: 27.7,
            xPercent: 0,
            yPercent: 0,
            xSpaceO: 0,
            ySpaceO: 0,
        }
    }

    componentDidMount() {
        console.log('MiniMap CDM coordsList: ', this.props.coordsList);
        this.setState({coordsList: this.props.coordsList});
    }

    componentWillReceiveProps() {
        this.setState({coordsList: this.props.coordsList});
        console.log('Minimap coordsList updated props: ', this.props.coordsList);
    }

    // renderRoom looks at roomX and roomY properties for each room and calculate x and y position
    renderRoom = room => {
        let xPosition = 0;
        let yPosition = 0;
        console.log('renderRoom called');
        console.log('room to render: ', room); // At this point there are room.roomX and room.roomY coord values
        if (room.roomX === 0) {
            xPosition = (this.state.mapLength / 2) - (this.state.roomLength / 2);
            console.log('room.roomX = 0, xPosition = ', xPosition);
            
        } else if (room.roomX !== 0) {
            console.log('room.roomX = ', room.roomX);
            xPosition = null;
        }
        
        if (room.roomY === 0) {
            yPosition = (this.state.mapLength / 2) - (this.state.roomLength / 2);
            console.log('room.roomY = 0, yPosition = ', yPosition);
            
        } else if (room.roomY !== 0) {
            console.log('roomY = ', room.RoomY);
            yPosition = null;
            
        }
        return (
            // <div className='room'>
                <Room xPosition={xPosition} yPosition={yPosition}>
                Room
                </Room>
            // </div>
        )
    }

    render() {
        return (
            <div className='minimap'>

                {this.state.coordsList ? this.state.coordsList.map((room, i) => {
                    return (
                        <div key={i}>
                            {this.renderRoom(room)};
                        </div>
                    )
                }) : null } 

                {/* {this.state.coordsList.forEach(room => {
                    this.renderRoom(room);
                })} */}

            </div>
        )
    }
}

export default MiniMap;

