import React, { Component } from 'react';
import Styled from 'styled-components';
import RoomList from './RoomList';

const Wrapper = Styled.div`
    position: absolute;
    margin: 0 auto;
    width: 100%;
    
    h1 {
        margin-left: 10%;
        color: #E7A837;
    }
`;

const TextArea = Styled.div`
    margin: 20px auto;
    width: 80%;
    overflow: hidden;
    position: fixed;
    top: 100px;
    left: 10%;
    bottom: 60px;
    color: #fff;
    background-color: #000;
    
`;

const Container2 = Styled.div`
    width: 100%;
    height: 99%;
    position: absolute;
    right: -15px;
    overflow: auto;
`;

const UserInput = Styled.div`
    position: fixed;
    width: 80%;
    left: 10%;
    bottom: -10px;
    margin: 50px auto;
    background-color: #000;
    display: flex;
    justify-content: space-evenly;
    
    input {
        width: 80%;
        height: 40px;
        margin-right: 10%;
        background-color: #000;
        color: #fff;
    }
`;

const Button = Styled.button`
    width: 160px;
    height: 40px;
    cursor: pointer;
    font-size: 16px;
    border: 1px solid #E7A837;
    border-radius: 20px;
    background-color: #E7A837;
    
    &:hover {
        background-color: #fff;
    }
`;

class MainPage extends Component {

    handleButton = e => {
        e.preventDefault();
        this.props.handleSubmit();
    }

    render() {
        return (
            <Wrapper>
                {this.props.isLogged ? <h1>Welcome {this.props.username}</h1> : null }
                    <form onSubmit={this.handleButton} >
                        <TextArea>
                            <Container2>
                                <RoomList rooms={this.props.rooms} players={this.props.players}/>
                            </Container2>

                            {/*<Room title={this.props.title} description={this.props.description} rooms={this.props.rooms}/>*/}
                        </TextArea>
                        <UserInput>
                            <input type="text"
                                   name="command"
                                   defaultValue={this.props.command}
                                   placeholder="User input"
                                   onChange={this.props.handleChange}
                            />
                            <Button onClick={this.handleButton}>Send</Button>
                        </UserInput>
                    </form>
            </Wrapper>
        )
    }
};

export default MainPage;