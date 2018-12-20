import React, { Component } from 'react';

class MiniMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coordsList: [],
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

    render() {
        return (
            <div className='minimap'>
                Minimap
            </div>
        )
    }
}

export default MiniMap;