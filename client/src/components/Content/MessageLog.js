import React from 'react';
import styled from 'styled-components';
import Message from './Message';

const Div = styled.div`
    padding: 0 10px;
    text-align: left;
    border: 1px solid #457B9D;
    border-radius: 5px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.16), 0 6px 6px rgba(45,45,45,0.23);
    background: rgba(240, 240, 240, .7);
    margin: 20px 0;
    min-height: 48em;
`

const TextArea = styled.textarea`
    resize: none;
    text-align: center;
    background: none;
    border: none;
    width: 100%;
    min-height: 26em;
    margin-top:15px;
    font-size: 12px;
`

const MessageLog = (props) => {
    const header = 
    `
    ██╗      █████╗ ███╗   ███╗██████╗ ██████╗  █████╗     
    ██║     ██╔══██╗████╗ ████║██╔══██╗██╔══██╗██╔══██╗    
    ██║     ███████║██╔████╔██║██████╔╝██║  ██║███████║    
    ██║     ██╔══██║██║╚██╔╝██║██╔══██╗██║  ██║██╔══██║    
    ███████╗██║  ██║██║ ╚═╝ ██║██████╔╝██████╔╝██║  ██║    
    ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═════╝ ╚═════╝ ╚═╝  ╚═╝    

     █████╗ ██████╗ ██╗   ██╗███████╗███╗   ██╗████████╗██╗   ██╗██████╗ ███████╗
    ██╔══██╗██╔══██╗██║   ██║██╔════╝████╗  ██║╚══██╔══╝██║   ██║██╔══██╗██╔════╝
    ███████║██║  ██║██║   ██║█████╗  ██╔██╗ ██║   ██║   ██║   ██║██████╔╝█████╗  
    ██╔══██║██║  ██║╚██╗ ██╔╝██╔══╝  ██║╚██╗██║   ██║   ██║   ██║██╔══██╗██╔══╝  
    ██║  ██║██████╔╝ ╚████╔╝ ███████╗██║ ╚████║   ██║   ╚██████╔╝██║  ██║███████╗
    ╚═╝  ╚═╝╚═════╝   ╚═══╝  ╚══════╝╚═╝  ╚═══╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝╚══════╝ 

    List of Commands:                                          Color Codes:

    [move <direction>]   Move to different room                [red]       Error         
    [say]                Broadcast a message to room           [green]     Player Message
                                                               [black]     Game Message   
    `
    return (
        <Div className="game-messageLog">
            <TextArea name="asciiart" cols="140" rows="6" value={header} disabled></TextArea>
            {props.messages.map((message, index) => 
             {
                return (
                <div key={index}>
                    <Message item={message} />
                </div>
            )})}
        </Div>
    );
}

export default MessageLog;