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

const Form = styled.form`
    border: 1px solid #457B9D;
    border-radius: 5px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.16), 0 6px 6px rgba(45,45,45,0.23);
    background: rgba(240, 240, 240, .7);
    margin: 20px 0;
    min-height: 2em;
    display: flex;
`

const Button = styled.button`
    border: None;
    background: #457B9D;
    opacity: 1;
    color: white;
    cursor: pointer;
`

const Commands = (props) => {
    return (
        <Form onSubmit={props.submitHandler}>
            <Input type="text" className="console-command" value={props.command} onChange={props.changeHandler} placeholder="Enter Command" />
            <Button type='submit'>Submit</Button>
        </Form>
    );
}

export default Commands;