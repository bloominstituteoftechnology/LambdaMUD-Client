import React from "react";
import { Container, Row, Col } from "reactstrap";

const Window = () => {
    const players = ["Lola", "Lisa", "Jakobi", "Baxter"];
    const messages = ["Lisa says Hello", "Jakobi says I Win!"];
    return (
        <div className="window">
            <Container>
                <Row>
                    <div id="room">
                        <h4>Foyer</h4>
                        <p>
                            Dim light filters in from the south. Dusty passages run north and
                            east.
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
                            { players.map((name, id) => (
                                <li>*{ name }</li>
                            )) }
                        </div>
                    </Col>
                    <Col sm="1">* * * * *</Col>
                    <Col sm="6">
                        <div>
                            <h3>Messages</h3>
                            { messages.map(message => (
                                <li>*{ message }</li>
                            )) }
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Window;
