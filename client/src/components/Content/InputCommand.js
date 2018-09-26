import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
    height: 2em;
    background: None;
    padding: 0;
    border:0;
    outline: none;
    width: 100%;
    padding: 0 5px;
    &::placeholder {
        color: rgba(50,50,50,0.6);
    }
`

const Div = styled.div`
    border: 1px solid #457B9D;
    border-radius: 5px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.16), 0 6px 6px rgba(45,45,45,0.23);
    background: rgba(240, 240, 240, .7);
    margin: 20px 0;
    min-height: 2em;
`

const InputCommand = (props) => {
    return (
        <Div>
            <Input type="text" className="console-command" placeholder="Enter Command" />
        </Div>
    );
}

export default InputCommand;