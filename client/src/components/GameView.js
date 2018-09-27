import React, { Component } from 'react';
import axios from "axios";
import TextBox from './TextBox';



class GameView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            b:[],
            direction:'',
            room:{
            title:''
            }
            
        }
    }
    componentDidMount() {

        const local = 'http://127.0.0.1:8000'
        const apiUrl = 'https://lam-mud-2.herokuapp.com'
        const token = sessionStorage.getItem('token')
        // console.log(err.response)
        axios
        .get(`${apiUrl}/api/adv/init/`, {headers: {Authorization:`Token ${token}` }})
        .then(response => {
          console.log("Get Response",response);
          this.setState({b:'',room: response.data, });
        })
        .catch(err => {
          console.log(err.response);
        });
      }    
      changeInput = e => this.setState({ [e.target.name]: e.target.value });

      moveHandler = e => {
        const token = sessionStorage.getItem('token')
        const local = 'http://127.0.0.1:8000'
        const apiUrl = 'https://lam-mud-2.herokuapp.com'
        const direction = {
            direction: this.state.direction,   
        }
        axios
          .post(
            `${apiUrl}/api/adv/move/`, direction,{headers: {Authorization:`Token ${token}` }},
             
          )
          .then(response => {
            console.log("Get Response",response);
          this.setState({b:'',room: response.data, direction:'', });
          })
          .catch(err => console.log(err.response))
      };

    render() { 
        
        return (
            <div> 
             GameView
             <TextBox />
             <input
          className="input"
          value={this.state.direction}
          name="direction"
          type="text"
          placeholder="direction"
          onChange={this.changeInput}
        />
        n,s,e,w
             <div>
             <p>{this.state.room.title}</p>
             <p>{this.state.room.description}</p>
             <p>{this.state.room.name}</p>
             </div>
             <button onClick={this.moveHandler}> move</button>
            </div>
        );
    }
}


export default GameView;