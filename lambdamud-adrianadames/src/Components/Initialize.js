import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import styled from 'styled-components';

const Initialize = props => {
    return (
        <div>
            <button onClick = {props.initializeSubmitHandler} type = 'submit'>
                <Link to = "/dashboard">
                    INITIALIZE
                </Link>
            </button>
        </div>
    )
}



export default Initialize