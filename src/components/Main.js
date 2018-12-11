import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import MainUserInput from './MainUserInput'
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
    this.initialize()
  }

  initialize = () => {
    const token = localStorage.getItem('token')
    const headers = { headers: { Authorization: `Token ${token}` } }
    axios.get('https://lambdamud-timh1203.herokuapp.com/api/adv/init/', headers)
      .then(res => {
        const textPackage = [...this.state.textLog, {
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
        const logPackage = [...this.state.log, {
          title: res.data.title,
          desc: res.data.description,
          players: res.data.players,
          error_msg: res.data.error_msg,
        }]
        this.setState({
          title: res.data.title,
          desc: res.data.description,
          players: res.data.players,
          error_msg: res.data.error_msg,
          log: logPackage
        })
      })
      .catch(err => console.log(err))
  }

  render() {
    const { title, desc, players } = this.state
    return (
      <Div1>
        <Div2>
          <p>Adventure</p>
          <Div3>
            <hr />
            <p>{title}</p>
            <p>{desc}</p>
            {
              players.length > 0 && (
                <p>{players.length === 1 ? `${players} is` : `${players.join(", ")} are`} standing here</p>
              )
            }
          </Div3>
          <Div4>
            <MainUserInput
              move={this.move}
            />
          </Div4>
        </Div2>
        <button onClick={e => this.props.logout(e)}>Logout</button>
      </Div1>
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
      margin: 0 auto;
      border: 1px solid white;
      padding: 1rem;
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
