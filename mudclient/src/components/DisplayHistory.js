import React, { Component } from 'react';
import './components.css';


class DisplayHistory extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className='display-history'>
                <h2 className='display-player-text'>Game History</h2>
               {this.props.progress.map(progressitem => {
                 return  <p className ='display-history-text'>{progressitem.title}. {progressitem.description} -- Other Players in Room: {progressitem.players.length ? progressitem.players.length : '-'} </p>
               })}
            </div>
        );
    }
}

export default DisplayHistory;  