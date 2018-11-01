import React , { Component } from 'react'
import styled from 'styled-components'
import moment from 'moment'

export default class UpdatesBin extends Component {
    constructor(props){
        super(props)
        this.myRef = React.createRef();
    }
    
    scrollToBottom(){
        var objDiv = this.myRef.current;
        objDiv.scrollTop = objDiv.scrollHeight; 
    }
    
    componentDidUpdate(prevProps) {
        this.scrollToBottom();
    }
    
    render(){
        return(
            <UpdatesBinDiv> 
                <div className="updates-bin" ref={this.myRef}>
                        {this.props.fromServer.length > 0 ? this.props.fromServer.map((update, i )=> {
                            return (
                                <div key={i} className='event'>
                                    <div className="updates-left">
                                        <p>{moment(update.time).format('LLL')}</p>
                                        {update.message || update.response ? 
                                            <span>{update.message}{update.response}</span> : 
                                            <React.Fragment>
                                                <p>{update.title}</p> 
                                                {update.players && update.players.length > 0 ?
                                                    <span> with {update.players.map(player => <span>{player}, </span>)}</span> :
                                                    null}
                                            </React.Fragment>
                                        }
                                    </div>
                                    <div key={i} className="updates-right">
                                        <p>{update.description}</p>
                                    </div>
                                </div>
                            )
                        }) : null}
                    </div>
            </UpdatesBinDiv>
        )
    }
}

const UpdatesBinDiv = styled.div`
    box-sizing: border-box;
    .updates-bin{
        overflow: auto;
        width: 100%;
        display: flex;
        flex-direction: column;
        max-height: 80vh;
        &::-webkit-scrollbar {
            width: 6px;
            background-color: black;
            border: 1px solid #008000;
            margin-left: 5px;
            &-thumb{
                background-color: #008000;   
            }
        }
        .event{
            display: flex;
            flex-direction: row;
            align-items: space-between;
            min-height: 75px;
            .updates-left{
                border: 1px solid #008000;
                min-width: 35%;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                justify-content: center;
                p {
                    margin: 0;
                }
            }
            .updates-right{
                width: 100%;
                border: 1px solid #008000;
                display: flex;
                text-align:left;
                margin-right: 4px;
                p {
                    margin: 0 6px;
                }
            }
        }
    }
`