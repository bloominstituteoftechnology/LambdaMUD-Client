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
    left: ${props => props.left}px;
    bottom: ${props => props.bottom}px;
`

class MiniMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initialState: {},
            coordsList: [],
            mapLength: 201,
            roomLength: 27.7,
            xPercent: 0,
            yPercent: 0,
            xSpaceO: 0,
            ySpaceO: 0,
        }
    }

    //  getInitialState *is only called once when initially rendering* the component:
    getinitialState() {
        this.setState({
            coordsList: this.props.coordsList,
            initialState: this.state
        });
    }
    //     console.log('MiniMap getInitialState initialState: ', this.state.initialState);
    //     console.log('MiniMap getInitialState coordsList: ', this.state.coordsList);
    // }

    // componentDidMount() {
    // }

    // shouldComponentUpdate *is never called on initial rendering*. A boolean value must be returned:
    shouldComponentUpdate() {
        const currentState = this.state;
        console.log('minimap SCU initialState: ', this.state.initialState);
        console.log('minimap SCU currentState: ', currentState);
        if (currentState !== this.state.initialState) {
            return true;
        } else {
            return false;
        }
    }

    // componentWillUpdate gets called as soon as the shouldComponentUpdate returns true:
    componentWillUpdate() {

    }

    // componentDidUpdate is called after the render method:
    componentDidUpdate() {

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

        xPosition = (this.state.mapLength / 2) + (room.roomX * this.state.roomLength) - (this.state.roomLength / 2);
        yPosition = (this.state.mapLength / 2) + (room.roomY * this.state.roomLength) - (this.state.roomLength / 2);

    
        return (
            <Room xPosition={xPosition} yPosition={yPosition}></Room>
        )
    }

    
    // Does render funtion need to be pure? Is this pure?
    render() {
        return (
            <div className='minimap'>

                {this.props.coordsList ? this.props.coordsList.map((room, i) => {
                    return (
                        <div key={i}>
                            {this.renderRoom(room)}
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

