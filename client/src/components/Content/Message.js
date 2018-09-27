import React from 'react';
import styled from 'styled-components';

const Hr = styled.hr`
    border: 0;
    height: 1px;
    background-image: linear-gradient(to right, rgba(0, 0, 0, .1), rgba(0, 0, 0, 0.3), rgba(0, 0, 0, .1));
`

const Message = (props) => {
    let color = '';
    if (props.item.tag === 'player') {
        color = 'green'; 
    } else if (props.item.tag === 'error') {
        color = 'red';
    } else if (props.item.tag === 'whisper'){
        color = '#8F2AAA';
    } else if (props.item.tag === 'shout') {
        color = '#BF6637';
    } else {
        color = 'black';
    }
    return (
        <div key={props.key}>
            {props.item.message.map((msg, index) => <p key={`msg-${index}`} style={{color: color}}>{msg}</p>)}
            <Hr />
        </div>
    );
}

export default Message;