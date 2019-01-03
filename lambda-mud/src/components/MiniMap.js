import React, { Component } from 'react';
import styled from 'styled-components';

const Room = styled.div.attrs({
    left: props => props.xPosition,
    bottom: props => props.yPosition,
    bg: props => props.currentRoom === props.roomName,
})`
    background-color: yellow;
    color: black;
    width: 27.7px;
    height: 27.7px;
    border: .5px solid black;
    position: absolute;
    left: ${props => props.left}px;
    bottom: ${props => props.bottom}px;
`
const CurrentRoom = styled(Room)

class MiniMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentRoom: '',
        }
    }

    componentDidMount() {
        this.setState({coordsList: this.props.coordsList});
        console.log('Minimap CDM props.coordsList: ', this.props.coordsList);
        console.log('MiniMap CDM current room name: ', this.props.currentRoom);

    }

    // componentWillReceiveProps() {
    //     this.setState({coordsList: this.props.coordsList});
    //     console.log('Minimap CWRP props.coordsList: ', this.props.coordsList);
    // }

    // Does render funtion need to be pure? Is this pure?
    render() {
        return (
            <div className='minimap'>

                {this.props.coordsList ? this.props.coordsList.map((room, i) => {
                    return (
                        <Room 
                            key={i} 
                            xPosition={room.xPosition} 
                            yPosition={room.yPosition}
                            roomName={room.roomName}
                            currentRoom={this.props.currentRoom}>
                        </Room>
                    )
                }) : null } 

            </div>
        )
    }
}

export default MiniMap;

