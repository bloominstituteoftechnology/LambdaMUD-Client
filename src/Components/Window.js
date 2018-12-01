import React, {Component} from "react";
import { Container, Row, Col } from "reactstrap";
import axios from 'axios';
const players = ["Lola", "Lisa", "Jakobi", "Baxter"];
const messages = ["Lisa says Hello", "Jakobi says I Win!"];

class Window extends Component {
   state = {
            username: "",
            uuid: "",
            token: "",
            room: "",
            description: "",
            players: [],
            messages: []

        }
    componentDidMount() {
    const token = {headers: {
        Authorization: `Token ${localStorage.getItem('Token')}` 
    }}
    // console.log('TOKEN', token)
    axios
    .get('https://lisacee-mud.herokuapp.com/api/adv/init', token)
    .then(res => {
        console.log(res)
    })
    .catch(error => {
        console.log(error.response.data)
    })
    }
    

    render() {
        // console.log(this.state)
        return <div className="window">
            <Container>
              <Row>

                <div id="room">
                  <h4>Foyer</h4>
                  <p>
                    Dim light filters in from the south. Dusty passages
                    run north and east.
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

                    {players.map((name, id) => (
                      <li key={id}>*{name}</li>
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
