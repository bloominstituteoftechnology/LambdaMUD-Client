import React from 'react';

import './index.css';

const RoomInfo = props => {
  return(
    <div className="Info">
      <h2 className="Room">{props.room}</h2>
      <h3 className="Desc">{props.desc}</h3>
    </div>
  )
}

export default RoomInfo;