import React from "react";

function PusherDiv(props) { 
    console.log(props.displaymessage)
  if (props.displaymessage === '') {
    return null;
  }
  else {
    return (
      <div>
        <h2> {props.displaymessage}</h2>
      </div>
    );
  }
}
 

export default PusherDiv;
