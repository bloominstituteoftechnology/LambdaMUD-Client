import React, { Component } from 'react';
import Styled from 'styled-components';
import Room from './Room';
import RoomList from './RoomList';

const Wrapper = Styled.div`
    margin: 100px auto;
    width: 600px;
    height: 400px;
    border: 1px solid black;
`
const TextArea = Styled.div`
    margin: 20px auto;
    width: 500px;
    height: 250px;
    border: 1px solid black;
`

const UserInput = Styled.div`
    margin: 20px auto;
    width: 500px;
    height: 50px;
`

class MainPage extends Component {

    handleButton = e => {
        e.preventDefault();
        this.props.handleSubmit();
    }

    render() {
        return (
            <Wrapper>
                <h1>Main Page</h1>
                <form onSubmit={this.handleButton} >
                    <TextArea>
                        <RoomList rooms={this.props.rooms}/>
                        {/*<Room title={this.props.title} description={this.props.description} rooms={this.props.rooms}/>*/}
                    </TextArea>
                    <UserInput>
                        <input type="text"
                               name="command"
                               defaultValue={this.props.command}
                               placeholder="User input"
                               onChange={this.props.handleChange}
                        />
                        <button onClick={this.handleButton}>Send</button>
                    </UserInput>

                </form>
            </Wrapper>
        )
    }
};

export default MainPage;