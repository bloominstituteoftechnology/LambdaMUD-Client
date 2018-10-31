import React from 'react';
import styled from 'styled-components';
import Comms from './Comms';

const Infinite = require('react-infinite')

// Infinite brings solutions for this type of display needs, like infinite scrolling

const Div = styled.div`
    padding: 0 10px;
    text-align: left;
    border: 1px solid #457B9D;
    border-radius: 5px;
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
    //     this.header =
    //         `
                                 
    // `
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