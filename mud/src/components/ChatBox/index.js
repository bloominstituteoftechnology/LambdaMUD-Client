import React from 'react';
import Infinite from 'react-infinite';

import Message from '../Message';
import './index.css';

const ChatBox = props => {
  return(
    <Infinite
      className="Infinite"
      containerHeight={200}
      elementHeight={38}
      displayBottomUpwards>
        {props.messages.map((msg, i) => {
          return <Message message={msg.msg} style={msg.style} key={i} />
        })}
    </Infinite>
  )
}

export default ChatBox