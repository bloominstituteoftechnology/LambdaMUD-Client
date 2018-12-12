// Handles the main UI for display, initialize, move, and say
import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import MainUserInput from './MainUserInput'
import MainTextOutput from './MainTextOutput'
import Pusher from 'pusher-js'

// Styled-Components
const Div1 = styled.div`
  width: 100%;
`
const Div2 = styled.div`
  width: 90%;
  margin: 0 auto;
  border: 1px solid white;
  padding: 1rem;
`
const Div3 = styled.div`
  width: 80%;
  height: 50vh;
  margin: 0 auto;
  border: 1px solid white;
  padding: 1rem;
  overflow: auto;
  display: flex;
  flex-direction: column-reverse;
`
const Div4 = styled.div`
  width: 80%;
  margin: 0 auto;
  border: 1px solid white;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
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
    if (this.state.textLog.length < 1) {
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
          const messageObject = [
            { "message": data.message },
            ...this.state.textLog
          ]
          this.setState({
            ...this.state,
            textLog: messageObject
          })
        })

        const textPackage = [{
          title: res.data.title,
          desc: res.data.description,
          players: res.data.players,
          uuid: res.data.uuid,
        }]
        this.setState({
          title: res.data.title,
          desc: res.data.description,
          players: res.data.players,
          uuid: res.data.uuid,
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

  render() {
    return (
      <Div1>
        <Div2>
          <p>Adventure</p>
          <Div3>
            <MainTextOutput
              textLog={this.state.textLog}
            />
          </Div3>
          <Div4>
            <MainUserInput
              move={this.move}
              say={this.say}
            />
          </Div4>
        </Div2>
        <button onClick={e => this.props.logout(e)}>Logout</button>
      </Div1 >
    )
  }
}
