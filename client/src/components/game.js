import React , { Component } from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'

export default class Game extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }
    
    componentDidMount(){
        if (!localStorage.getItem('MUD')){
            return <Redirect to="/" />
        }
    }

    logout = (e) => {
        e.preventDefault();
        console.log('logout')
        localStorage.removeItem('MUD') 
    }

    render(){
        return(
            <GameDiv> 
                <button onClick={this.logout}>logout</button>
                <h1>game div</h1>
            </GameDiv>
        )
    }
}

const GameDiv = styled.div`
    border: 1px solid red;
    background: black;
    color: green;
    height: 100%;
`