import React from 'react';
import styled from 'styled-components';
import Comms from './Comms';

const Infinite = require('react-infinite')

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
    min-height: 28em;
    margin-top:15px;
    font-size: 13px;
    font-weight: bold;
`

class MessageLog extends React.Component {
    constructor(props) {
        super(props)
        this.header =
            `


    List of Commands:                                        Color Codes:

    [move <direction>]   Move to different room              [red]       Error          
    [say <message>]      Broadcast a message to room         [green]     Player Message 
    [shout <message>]    Broadcast a message globally        [black]     General Message
    [pm <message>]       Private message a player            [orange]    Global Message 
    [who]                Display all online players          [purp]      Private Message
    [whois <username>]   Display location of player                                        
    `
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "instant"});
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    render() {
        return (
            <Div className="game-messageLog">
                <TextArea name="asciiart" cols="140" rows="6" value={this.header} disabled></TextArea>
                <Infinite
                    id = "infinite-scroll"
                    elementHeight={10}
                    containerHeight={400}
                    displayBottomUpwards
                    infiniteLoadBeginEdgeOffset = {999999}
                >
                    {this.props.messages.map((message, index) => {
                        return (
                            <Comms item={message} key={index} />
                        )
                    })}
                    <div style={{ float: "left", clear: "both" }}
                        ref={(el) => { this.messagesEnd = el; }}>
                    </div>
                </Infinite>
            </Div>
        );
    }
}

export default MessageLog;