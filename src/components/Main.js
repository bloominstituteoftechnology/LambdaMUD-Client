import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import MainUserInput from './MainUserInput'
import MainTextOutput from './MainTextOutput'

class Main extends React.Component {
  state = {
    textLog: [],
    title: "",
    description: "",
    players: [],
    uuid: null,
    error_msg: ""
  }

  componentDidMount() {
    if (this.state.textLog.length < 1) {
      this.initialize()
    }
  }

  componentWillUnmount() {
    this.initialize()
  }

  initialize = () => {
    const token = localStorage.getItem('token')
    const headers = { headers: { Authorization: `Token ${token}` } }
    axios.get('https://lambdamud-timh1203.herokuapp.com/api/adv/init/', headers)
      .then(res => {
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

  move = (directionObject) => {
    const token = localStorage.getItem('token')
    const headers = { headers: { Authorization: `Token ${token}` } }
    axios.post('https://lambdamud-timh1203.herokuapp.com/api/adv/move/', directionObject, headers)
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
            />
          </Div4>
        </Div2>
        <button onClick={e => this.props.logout(e)}>Logout</button>
      </Div1 >
    )
  }
}

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

export default Main
