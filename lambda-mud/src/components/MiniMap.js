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
        
    }

    componentDidMount() {
        this.setState({coordsList: this.props.coordsList});
    }

    componentWillReceiveProps() {
        this.setState({coordsList: this.props.coordsList});
        console.log('Minimap coordsList updated props: ', this.props.coordsList);
    }

    // Does render funtion need to be pure? Is this pure?
    render() {
        return (
            <div className='minimap'>

                {this.props.coordsList ? this.props.coordsList.map((room, i) => {
                    return (
                        <Room key={i} xPosition={room.xPosition} yPosition={room.yPosition}></Room>
                    )
                }) : null } 

            </div>
        )
    }
}

export default MiniMap;

