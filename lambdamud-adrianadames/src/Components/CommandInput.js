import React, {Component} from 'react';
import styled from 'styled-components';

const CommandInput = props => {
    return (
        <CommandInputContainerStyledDiv>
            <div>Command Input (?):</div>
            <form onSubmit = {props.commandInputSubmitHandler}>
                <div>
                    <input 
                        type = 'text'
                        name = 'commandInput'
                        value = {props.commandInput}
                        onChange = {props.inputChangeHandler}
                    />
                    <button onClick = {props.commandInputSubmitHandler} type = 'submit'> Submit </button>
                </div>
            </form>
        </CommandInputContainerStyledDiv>
    )
}

const CommandInputContainerStyledDiv = styled.div`
  margin:5px;
  border:1px solid green;
`

export default CommandInput; 

