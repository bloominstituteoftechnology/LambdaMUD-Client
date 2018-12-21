import React, { Component } from 'react';

class MiniMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coordsList: [],
            mapLength: 7,
        }
    }

    componentDidMount() {
        console.log('MiniMap CDM coordsList: ', this.props.coordsList);
        this.setState({coordsList: this.props.coordsList});
    }

    componentWillReceiveProps() {
        this.setState({coordsList: this.props.coordsList});
        console.log('Minimap coordsList updated props: ', this.props.coordsList);
        let coordsList = this.state.coordsList;
        if (coordsList.length > 0) {
            let maxX = coordsList[0]['roomX'];
            for (let i = 0; i < coordsList.length; i++) {
                if (coordsList[i]['roomX'] > maxX) {
                    maxX = coordsList[i]['roomX'];
                }
            }
            const mapWidth = maxX;
            console.log('mapWidth: ', mapWidth);
        }
    }

    // renderRoom = room => {
    //     const room = room;
    //     return (
    //         <div className='room'>

    //         </div>
    //     )
    // }

    render() {
        return (
            <div className='minimap'>

                {this.state.coordsList.forEach(function(room) {
                    this.renderRoom(room);
                })}

                {/* for each room in coordsList render a div */}
                {/* dynamically assign classNames and use that to position each div*/}
            </div>
        )
    }
}

export default MiniMap;

{/* <div className='grid-unit'>
                </div>
                <div className='grid-unit'>
                </div>
                <div className='grid-unit'>
                </div>
                <div className='grid-unit'>
                </div>
                <div className='grid-unit'>
                </div>
                <div className='grid-unit'>
                </div>
                <div className='grid-unit'>
                </div>
                <div className='grid-unit'>
                </div>
                <div className='grid-unit'>
                </div>
                <div className='grid-unit'>
                </div>
                <div className='grid-unit'>
                </div>
                <div className='grid-unit'>
                </div>
                <div className='grid-unit'>
                </div>
                <div className='grid-unit'>
                </div>
                <div className='grid-unit'>
                </div>
                <div className='grid-unit'>
                </div>
                <div className='grid-unit'>
                </div>
                <div className='grid-unit'>
                </div>
                <div className='grid-unit'>
                </div>
                <div className='grid-unit'>
                </div>
                <div className='grid-unit'>
                </div>
                <div className='grid-unit'>
                </div>
                <div className='grid-unit'>
                </div>
                <div className='grid-unit'>
                </div>
                <div className='grid-unit'>
                </div>
                <div className='grid-unit'>
                </div>
                <div className='grid-unit'>
                </div>
                <div className='grid-unit'>
                </div>
                <div className='grid-unit'>
                </div>
                <div className='grid-unit'>
                </div>
                <div className='grid-unit'>
                </div>
                <div className='grid-unit'>
                </div>
                <div className='grid-unit'>
                </div>
                <div className='grid-unit'>
                </div>
                <div className='grid-unit'>
                </div>
                <div className='grid-unit'>
                </div>
                <div className='grid-unit'>
                </div>
                <div className='grid-unit'>
                </div>
                <div className='grid-unit'>
                </div>
                <div className='grid-unit'>
                </div>
                <div className='grid-unit'>
                </div>
                <div className='grid-unit'>
                </div>
                <div className='grid-unit'>
                </div>
                <div className='grid-unit'>
                </div>
                <div className='grid-unit'>
                </div>
                <div className='grid-unit'>
                </div>
                <div className='grid-unit'>
                </div>
                <div className='grid-unit'>
                </div>
                <div className='grid-unit'>
                </div> */}