import React, {Component} from "react";
import { Container, Row, Col } from "reactstrap";
import axios from 'axios';
// const players = ["Lola", "Lisa", "Jakobi", "Baxter"];
const messages = ["Lisa says Hello", "Jakobi says I Win!"];

class Window extends Component {
   state = {
            username: "",
            uuid: "",
            room: "",
            description: "",
            players: [],
            messages: []

        }
    componentDidMount() {
    const token = {headers: {
        Authorization: `Token ${localStorage.getItem('Token')}` 
    }}

    axios
    .get('https://lisacee-mud.herokuapp.com/api/adv/init', token)
    .then(res => {
        console.log('RES', res)
        this.setState({
            username: res.data.name,
            uuid: res.data.uuid,
            room: res.data.title,
            description: res.data.description,
            players: res.data.players,
            messages: ["Lisa says Hello", "Jakobi says I Win!"]
        })
    })
    .catch(error => {
        console.log(error.response.data)
    })
    }
    

    render() {
        console.log('STATE', this.state)
        return <div className="window">
            <Container>
              <Row>

                <div id="room">
                  <h4>{this.state.room}</h4>
                  <p>
                    {this.state.description}
                  </p>
                  <p>*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*</p>
                </div>
              </Row>
              <Row>
                <div>
                  <h4>User Input</h4>
                  <input />
                  <button>Send</button>
                </div>
              </Row>
              <Row>
                <Col sm="5">
                  <div>
                    <h4>Players</h4>

                    {this.state.players.map((name, id) => (
                      <li key={id}>{name}</li>
                    ))}
                  </div>
                </Col>
                <Col sm="1">* * * * *</Col>
                <Col sm="6">
                  <div>
                    <h3>Messages</h3>
                    {messages.map((message, id) => (
                      <li key={id}>*{message}</li>
                    ))}
                  </div>
                </Col>
              </Row>
            </Container>
          </div>;
    }
    
};

export default Window;
