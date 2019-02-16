import React from 'react';

const Initialize = props => {
    return (
        <div>
            <button onClick = {props.initializeSubmitHandler} type = 'submit'>INITIALIZE</button>
        </div>
    )
}



export default Initialize