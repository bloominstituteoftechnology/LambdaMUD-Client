import React, { Component } from 'react';
import axios from 'axios';

export default class View1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      name: '',
      players: [],
      title: '',
      uuid: '',
    };
  }

  componentDidMount = () => {
    const token = localStorage.getItem('token')
    axios
      .get("https://lsmud.herokuapp.com/api/adv/init",
        {
          headers: {
            "Authorization": `Token ${token}`
          }
        }
      )
      .then(response => {
        console.log(response)
        this.setState({
          description: response.data.description,
          name: response.data.name,
          players: response.data.players,
          title: response.data.title,
          uuid: response.data.uuid,
        })
      })
      .catch((error) => console.log(error.response))
  }

  render() {
    return (
      <div>
        <div className="card">
          <div className="card-body">
            <p>{this.state.description}</p>
            <p>{this.state.name}</p>
            <p>{this.state.players}</p>
            <p>{this.state.title}</p>
            <p>{this.state.uuid}</p>
          </div>
        </div>

        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Direction" aria-label="Direction" aria-describedby="basic-addon2" />
          <div className="input-group-append">
            <button className="btn btn-outline-dark px-5" type="button">Send</button>
          </div>
        </div>
      </div>
    );
  }
}