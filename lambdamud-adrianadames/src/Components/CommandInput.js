import React, {Component} from 'react';
import styled from 'styled-components';

const CommandInput = props => {
    return (
        <div>
        <CommandInputContainerStyledDiv>
            <CommandInputHeadingContainerStyledDiv>
                <div>Command Input</div>
                <div onClick = {props.toggleViewInstructions}>(?)</div>
                <div>:</div>
            </CommandInputHeadingContainerStyledDiv>
            <CommandInputStyledForm onSubmit = {props.commandInputSubmitHandler}>
                    <CommandInputStyledInput 
                        type = 'text'
                        name = 'commandInput'
                        value = {props.commandInput}
                        onChange = {props.inputChangeHandler}
                    />
                    <CommandInputStyledButton onClick = {props.commandInputSubmitHandler} type = 'submit'> Submit </CommandInputStyledButton>
                    
            </CommandInputStyledForm>
        </CommandInputContainerStyledDiv>

        {props.viewInstructions ? 
        <div>
            <br/>
            <div>Move: /m + direction (direction = n (or north), e (or east), s or (south), w or (west))</div>
            <br/>
            <div>Say: /s + message text </div> 
        </div>
        : 
        null}
        

        </div>
    )
}



const CommandInputContainerStyledDiv = styled.div`
  margin:5px;
  border:1px solid green;
  display:flex;
  height:30px;
  font-size:16px;
  align-items:center;
`;

const CommandInputHeadingContainerStyledDiv = styled.div`
    display:flex;
    width:20%
`;
const CommandInputStyledForm = styled.form`
    display:flex;
    // border:1px solid pink;
    flex-grow:1;
    
`
const CommandInputStyledInput = styled.input`
    border: 1px solid green;
    background: black;
    color:#49fb35;
    font-family: 'Roboto Mono', monospace;
    flex-grow:1;
    font-size:16px;
`

const CommandInputStyledButton = styled.button`
    color:#49fb35;
    font-family: 'Roboto Mono', monospace;
    background: black;
    border:1px solid green;
    :hover {
    border:2px solid #49fb35;
    height:100%;
    // width:40%;
    // background: repeating-linear-gradient(
    //   45deg,
    //   #740042,
    //   #740042 3px,
    //   #560031 3px,
    //   #560031 6px
    // );
    
    }
`



export default CommandInput; 

