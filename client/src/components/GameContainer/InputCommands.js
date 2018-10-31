import React, { Fragment } from 'react';
import styled from 'styled-components';

const Input=styled.input`
	width: 300px;
        height: 25px;
	//margin-bottom: 20px;
	margin-right: 10px;
	border: 1px solid black;
	border-radius: 5px;

`



const InputCommands = (props) => {
    return (
	    <Fragment>
            <form onSubmit={props.inputParser}>
            <Input 
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
