import React, { Component } from 'react';
import axios from 'axios';
import { Card, CardText, CardBody, CardTitle, Button } from 'reactstrap';
import MudForm from './MudForm';

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      command: '',
    };
  }

  render() {
    const { uuid, name, title, description, players } = this.props;
    return (
      <div>
        <Card style={{ width: '40%', color: 'black' }}>
          <CardBody>
            <CardTitle>Title: {title}</CardTitle>{' '}
            <CardText>
              Desc: {description}
              <br />
              {players} is standing here.{' '}
            </CardText>{' '}
          </CardBody>
        </Card>
        <MudForm />
      </div>
      // // <div className="Room">
      // <Card style={{ width: '40%' }}>
      //   <CardBody>
      //     <CardTitle>Title: {title}</CardTitle>
      //     <CardText>
      //       Desc: {description}
      //       <br />
      //       {players} is standing here.
      //     </CardText>
      //   </CardBody>
      //   <MudForm />
      // </Card>
      // </div>
    );
  }
}

export default Room;
