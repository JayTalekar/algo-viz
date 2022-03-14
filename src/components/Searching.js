import React from 'react'
import Navbarr from "./Navbar"
import "./Searching.css"
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Linear from "../images/Linear_Search.jpg"
import Binary from "../images/Binary_Search.jpg"
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import {Link} from "@reach/router"
function Searching() {
  return (
    <div className="search__algo">
        <Navbarr/>
        <div className="searching__heading">
            <h1>Searching Algorithm</h1>
        </div>
        <div className="searching_card-list" style={{backgroundColor:'#203239'}}>
      <Container style={{marginTop:"20px"}}>
        {/*row 1 */}
        <Row className="justify-content-md-center">
          <Col xs lg="3" md="6" sm="12" style={{marginTop:"20px"}}>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={Linear} />
              <Card.Body>
                <Card.Title>Linear Search Algorithm</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <Button variant="primary"><Link to="/linear-search" style={{all:"unset",color:"white"}}>Visualize</Link></Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md="auto">
            <Col xs lg="3" md="6" sm="12" style={{marginTop:"20px"}}>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={Binary}/>
                <Card.Body>
                  <Card.Title>Binary Search Algorithm</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Button variant="primary"><Link to="/binary-search" style={{all:"unset",color:"white"}}>Visualize</Link></Button>
                </Card.Body>
              </Card>
            </Col>
          </Col>
          </Row>
         </Container>
          </div>
    </div>
  )
}

export default Searching