import React from "react";
import { Link } from "react-router-dom";
import {Container, Row, Col} from 'reactstrap';
import "../styles/style.css"

const FrontPage = () => {
  return (
    <div className="window front">
    <Container>
      <Row>
      <h1>Welcome to LambdaMUD</h1>
      </Row>
      <Row>
      <Link to={"/api/registration"}>
        <button>New User </button>
      </Link>

      <Link to={"/api/login"}>
        <button>Returning User</button>
      </Link>
      </Row>
      </Container>
    </div>

  );
};

export default FrontPage;
