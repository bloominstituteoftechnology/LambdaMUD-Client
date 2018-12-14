import React, { Component } from 'react';
import Styled from 'styled-components';
import RoomList from './RoomList';

// Styles

// Main wrapper
const Wrapper = Styled.div`
    position: absolute;
    margin: 0 auto;
    width: 100%;
    
    h1 {
        margin-left: 10%;
        color: #E7A837;
    }
`;

// Game main canvas
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

// Second canvas - hide's vertical scrollbar
const Container2 = Styled.div`
    width: 100%;
    height: 99%;
    position: absolute;
    right: -15px;
    overflow: auto;
`;

// Used for the Navigation Buttons
const Navi = Styled.div`
    width: 10%;
    position: relative;
    top: 120px;
    left: 90%;
    bottom: 41px;
    color: #fff;
    
    h3 {
        margin-left: 25%;
    }
`;

// Input for user command area
const UserInput = Styled.div`
    position: fixed;
    width: 80%;
    left: 10%;
    bottom: -10px;
    margin: 50px auto;
    background-color: #000;
    display: flex;
    justify-content: space-evenly;
    color: #fff;
    
    input {
        border: 0;
        width: 80%;
        margin: 10px 10% 0 1%;
        height: 30px;
        background-color: #000;
        color: #fff;
    }
    
    input:focus {
        outline: none;
    }
    
    p {
        margin-left: 1%;
    }
`;

// Buttons
const Button = Styled.button`
    width: 160px;
    height: 40px;
    cursor: pointer;
    font-size: 16px;
    border: 1px solid #E7A837;
    border-radius: 20px;
    background-color: #E7A837;
    margin-right: 1%;
    
    &:hover {
        background-color: #fff;
    }
`;

// The Navigation button itself - ref of Button
const NaviButton = Styled(Button)`
    width: 90%;
    margin-left: 5%;
    margin-bottom: 20px;
`;

/**
 * Renders the game page's view
 */
class MainPage extends Component {

    /**
     * Send's the user's input to the server
     */
    handleButton = e => {
        e.preventDefault();
        this.props.handleSubmit();
    }

    /**
     * Handles the navigation through buttons and sends to the userMove function
     * @param e - Event
     * @param dir - Direction
     */
    handleNavigationButton = (e, dir) => {
        e.preventDefault();
        this.props.userMove(dir);
    }

    _handleKeyPress = e => {
        if (e.key === 'Enter') {
            this.props.handleSubmit();
        }
    }

    // Render the component
    render() {
        return (
            <Wrapper>
                {this.props.isLogged ? <h1>Welcome {this.props.username}</h1> : null }

                    <form >
                        <TextArea>
                            <Container2>
                                <RoomList rooms={this.props.rooms} players={this.props.players}/>
                            </Container2>

                            {/*<Room title={this.props.title} description={this.props.description} rooms={this.props.rooms}/>*/}
                        </TextArea>
                        <Navi>
                            <h3>Navigation</h3>
                            <NaviButton onClick={e => {this.handleNavigationButton(e, 'n')}}>North</NaviButton>
                            <NaviButton onClick={e => {this.handleNavigationButton(e, 's')}}>South</NaviButton>
                            <NaviButton onClick={e => {this.handleNavigationButton(e, 'e')}}>East</NaviButton>
                            <NaviButton onClick={e => {this.handleNavigationButton(e, 'w')}}>West</NaviButton>
                        </Navi>
                        <UserInput>
                            <p>>>></p>
                            <input type="text"
                                   name="command"
                                   defaultValue={this.props.command}
                                   placeholder="User input"
                                   onChange={this.props.handleChange}
                                   onKeyPress={this._handleKeyPress}
                            />
                            <Button onClick={this.handleButton}>Send</Button>
                        </UserInput>
                    </form>
            </Wrapper>
        )
    }
};

export default MainPage;