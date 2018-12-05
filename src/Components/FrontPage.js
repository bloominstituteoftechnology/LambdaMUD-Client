import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import "../styles/style.css";

const FrontPage = () => {
  return (
    <div className="window front">
      <Container>
        <Row>
          <h1>Welcome to LambdaMUD</h1>
        </Row>

        <Row>
          <Col sm={ { size: 3, offset: 1 } }>
            <Link to={ "/api/registration" }>
              <button>New Player </button>
            </Link>
          </Col>
          <p>or</p>
          <Col sm={ { size: 3 } }>
            <Link to={ "/api/login" }>
              <button>Returning Player</button>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FrontPage;
