import React from 'react';
import {initializeGame} from './../actions/index';
import {connect} from 'react-redux';
import Styled from 'styled-components';


const Container = Styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 80%;
    height: auto;
    border: 1px solid gray;
    border-radius: 10px;
`;

class Adventure extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.props.initialize()
    }
    render() {
        return (
            <Container>
                <h3>Adventure</h3>
                <p>{this.props.room}</p>
                <p>{this.props.description}</p>
                <p>{this.props.players}</p>

                <input 
                    type='textbody'
                    placeholder='Type a command'
                />
                <button>Enter</button>
                <button>Leave game</button>

            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
      user: state.game.user,
      room: state.game.current_room,
      description: state.game.room_description,
      players: state.game.players
    }
  }
  
  const mapActionsToProps = {
    initialize: initializeGame,
  }
  export default connect( mapStateToProps, mapActionsToProps)(Adventure);