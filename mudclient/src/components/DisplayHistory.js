import React, { Component } from 'react';
import './components.css';


class DisplayHistory extends Component {
    constructor(props) {
        super(props)
    }

    render() {
      var items;
      var histItemArray = [];
      if (this.props.progress.length > 0) {
      this.props.progress.map(hist_item => {
       return histItemArray.push(JSON.parse(hist_item))
       console.log('histItemArray', histItemArray)
      })
    }
      items = histItemArray.map(progressitem => {
                 return  <p className ='display-history-text'>{progressitem.title}. {progressitem.description} -- Other Players in Room: {progressitem.players.length ? progressitem.players.length : '-'} </p>
               })
    
        return (
            <div className='display-history'>
                <h2 className='display-player-text'>Game History</h2>
               {items}
               
            </div>
        );
    }
}

export default DisplayHistory;  