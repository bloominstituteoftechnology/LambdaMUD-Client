import React, { Fragment } from 'react';
import styled from 'styled-components';


const InputCommands = (props) => {
    return (
	    <Fragment>
            <form onSubmit={props.inputParser}>
            <input 
	    type="text"
	    name="input"
	    value={props.input} 
	    onChange={props.inputHandler} 
	    placeholder="Enter Command" 
	    />

            <button type='submit'>
	    Submit
	    </button>
            </form>
	    </Fragment>
    );
}

export default InputCommands;
