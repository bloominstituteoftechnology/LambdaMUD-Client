import React, { Fragment } from 'react';
import styled from 'styled-components';

const Input=styled.input`
	width: 300px;
        height: 25px;
	margin-left: 0%;
	margin-right: 10px;
	border: 1px solid black;
	border-radius: 5px;

`
const Button = styled.button`
        width: 100px;
        height: 25px;
        border-radius: 5px;
        border: 1px solid #fff;
        margin-bottom: 20px;
        &:hover {
        background: #0099CC;
        color: black;
        border: 1px solid #0099CC;
        }
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

            <Button type='submit'>
	    Submit
	    </Button>
            </form>
	    </Fragment>
    );
}

export default InputCommands;
