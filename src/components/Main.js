// Handles the main UI for display, initialize, move, and say
import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import MainUserInput from './MainUserInput'
import MainTextOutput from './MainTextOutput'
import Pusher from 'pusher-js'
import townImage from '../assets/images/town.jpg'

// Styled-Components
const Div1 = styled.div`
  width: 100%;
  font-size: 1.2rem;
  animation: fadein 3s;
  @keyframes fadein {
    from { opacity: 0; } to { opacity: 1; }
  }
`
const Div2 = styled.div`
  width: 90%;
  margin: 0 auto;
  border: 1px solid white;
  padding: 1rem;
  background-image: url(${townImage});
  background-size: cover;
  animation: fadein 8s;
  animation-timing-function: ease;
  @keyframes fadein {
    from { opacity: 0; } to { opacity: 1; }
  }
`
const Div3 = styled.div`
  width: 80%;
  height: 60vh;
  margin: 0 auto;
  border: 1px solid #2C7FCC;
  padding: 1rem;
  overflow: auto;
  display: flex;
  flex-direction: column-reverse;
  background-color: rgba(0, 0, 0, 0.7);
  @keyframes fadein {
    from { opacity: 0; } to { opacity: 1; }
  }
`
const Div4 = styled.div`
  width: 80%;
  height: 2vh;
  margin: 0 auto;
  border: 1px solid #2C7FCC;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.7);
  @keyframes fadein {
    from { opacity: 0; } to { opacity: 1; }
  }
`
const Button1 = styled.button`
  width: 100px;
  margin: 1rem auto;
  background: #2C7FCC;
  color: white;
  padding: 5px;
  font-size: 16px;
  border-radius: 2px;
  border: none;
  box-shadow: 0 2px 2px gray;
  font-family: "Julee";
  display: flex;
  justify-content: center;
  &:hover {
    cursor: pointer;
    color: #2C7FCC;
    background: black;
    box-shadow: 0 2px 6px #2C7FCC;
  }
`

export default class Main extends React.Component {
  state = {
    textLog: [],
    title: "",
    description: "",
    players: [],
    uuid: null,
    error_msg: ""
  }

  // FUNCTION: initialize a world if no existing textlog
  // ARGUMENTS: none
  // RETURNS: runs initialize on the server
  componentDidMount() {
    if (this.state.textLog.length < 1 && this.props.isLoggedIn) {
      this.initialize()
    }
  }

  // FUNCTION: unmounts any mounted methods
  // ARGUMENTS: none
  // RETURNS: none
  componentWillUnmount() {
    this.initialize()
  }

  // FUNCTION: initializes world, subcribe to pusher channels, update textLog
  // ARGUMENTS: none
  // RETURNS: add current room information to textLog, adds new user message to textLog if new broadcast
  initialize = () => {
    const token = localStorage.getItem('token')
    const headers = { headers: { Authorization: `Token ${token}` } }
    axios.get(process.env.REACT_APP_SERVER + '/api/adv/init/', headers)
      .then(res => {
        const pusherKey = process.env.REACT_APP_PUSHER_KEY
        const pusherCluster = process.env.REACT_APP_PUSHER_CLUSTER
        const pusher = new Pusher(pusherKey, {
          cluster: pusherCluster
        })
        const channel = pusher.subscribe(`p-channel-${res.data.uuid}`);
        channel.bind('broadcast', data => {
          if (data.message) {
            const messageObject = [
              { "message": data.message },
              ...this.state.textLog
            ]
            this.setState({
              ...this.state,
              textLog: messageObject
            })
          }
        })
        pusher.bind('broadcast', data => {
          if (data.shout) {
            const shoutObject = [
              { "shout": data.shout },
              ...this.state.textLog
            ]
            this.setState({
              ...this.state,
              textLog: shoutObject
            })
          }
        })

        const textPackage = [{
          title: res.data.title,
          desc: res.data.description,
          players: res.data.players,
          uuid: res.data.uuid,
          allPlayerNames: res.data.allPlayerNames,
        }]
        this.setState({
          title: res.data.title,
          desc: res.data.description,
          players: res.data.players,
          uuid: res.data.uuid,
          allPlayerNames: res.data.allPlayerNames,
          textLog: textPackage
        })
      })
      .catch(err => console.log(err))
  }

  // FUNCTION: sends request to server to move to new area and checks if there is an error message
  // ARGUMENTS: directionObject contains direction to move from <MainUserInput /> component
  // RETURNS: updates info in textLog with new area information
  move = (directionObject) => {
    const token = localStorage.getItem('token')
    const headers = { headers: { Authorization: `Token ${token}` } }
    axios.post(process.env.REACT_APP_SERVER + '/api/adv/move/', directionObject, headers)
      .then(res => {
        if (res.data.error_msg) {
          alert(res.data.error_msg)
        }
        else {
          const textPackage = [
            {
              title: res.data.title,
              desc: res.data.description,
              players: res.data.players,
            },
            ...this.state.textLog
          ]
          this.setState({
            ...this.state,
            title: res.data.title,
            desc: res.data.description,
            players: res.data.players,
            error_msg: res.data.error_msg,
            textLog: textPackage
          })
        }
      })
      .catch(err => console.log(err))
  }

  // FUNCTION: sends a new user message to server and notifies other subscribed players
  // ARGUMENTS: userMessage accepts a string from <MainUserInput /> component
  // RETURNS: adds user message to textLog to display to current user
  say = (userMessage) => {
    const token = localStorage.getItem('token')
    const headers = { headers: { Authorization: `Token ${token}` } }
    const userMessageObject = {
      "message": userMessage
    }
    axios
      .post(process.env.REACT_APP_SERVER + '/api/adv/say/', userMessageObject, headers)
      .then(res => {
        const messageObject = [
          { "message": res.data.message },
          ...this.state.textLog
        ]
        this.setState({
          ...this.state,
          textLog: messageObject
        })
      })
      .catch(err => console.log(err.response));
  };

  // FUNCTION: shouts a new user message to server and notifies all players
  // ARGUMENTS: shoutMessage accepts a string from <MainUserInput /> component
  // RETURNS: adds user shout message to textLog
  shout = (shoutMessage) => {
    const token = localStorage.getItem('token')
    const headers = { headers: { Authorization: `Token ${token}` } }
    const shoutMessageObject = {
      "shout": shoutMessage
    }
    axios
      .post(process.env.REACT_APP_SERVER + '/api/adv/shout/', shoutMessageObject, headers)
      .then(res => {
        const returnedMessageObject = [
          { "shout": res.data.shout },
          ...this.state.textLog
        ]
        this.setState({
          ...this.state,
          textLog: returnedMessageObject
        })
      })
      .catch(err => console.log(err.response));
  };


  // FUNCTION: gets a list of all players
  // ARGUMENTS: none
  // RETURNS: list of all players
  getPlayers = () => {
  };

  render() {
    return (
      <Div1>
        <Div2>
          <p>Lambda MUD</p>
          <Div3>
            <MainTextOutput
              textLog={this.state.textLog}
            />
          </Div3>
          <Div4>
            <MainUserInput
              move={this.move}
              say={this.say}
              shout={this.shout}
              getPlayers={this.getPlayers}
            />
          </Div4>
        </Div2>
        <Button1 onClick={e => this.props.logout(e)}>Logout</Button1>
      </Div1 >
    )
  }
}
