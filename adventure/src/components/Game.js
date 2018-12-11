import { Component } from "react";
import Pusher from "pusher-js";
import StyledGame, { StyledInput } from "./styles/game";

const moves = {
    n: 'n',
    s: 's',
    e: 'e',
    w: 'w',
    south: 's',
    north: 'n',
    east: 'e',
    west: 'w'
};
class Game extends Component {
    state={
        text: ''
    };

      componentDidMount(){
          const token = localStorage.getItem('token');
          this.props.fetchInitInfo(token);
      }

      componentDidUpdate(prevProps){
          if (this.props.uuid !== prevProps.uuid) {
              const pusher = new Pusher('',{
                  cluster:'us2',
                  encrypted: true
              });
              const channel = pusher.subscribe(`p-channel-${this.props.uuid}`);
              channel.bind('broadcast', data =>
                this.props.fetchNewMessage(data.message)
                );
          }
      }

      handleChange (event) {
          this.setState({
              [event.target.name]: event.target.value
          });
          
      };

    handleSubmit(event){
          event.preventDefault();
          const token = localStorage.getItem('token');
          const command = this.state.text.split('');
          if (moves[command[0]]) {
              this.props.movePlayer(moves[command[0]], token);

          } else{
              this.props.talkPlayer(this.state.text, token);
          }
          this.setState({ text:''});
      };}

export default Game;
