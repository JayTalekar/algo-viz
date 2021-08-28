import React from "react";
import "./Home.css";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button'
import bubble from "../images/bubble.jfif"
import {Link} from "@reach/router"
import Selection from "../images/selection.png"
function Home() {
  return (
    <div className="home">
      <Card className="sort_card" style={{ width: "18rem" }}>
        <Card.Img variant="top" src={bubble}/>
        <Card.Body>
          <Card.Title>Bubble Sort</Card.Title>
          <Card.Text>
             Bubble Sort Algorithm Visualization
          </Card.Text>
          <Button variant="primary"><Link className="link" to="/bubblesort">GO SOMEWHERE</Link></Button>
        </Card.Body>
      </Card>

      <Card className="sort_card" style={{ width: "18rem" }}>
        <Card.Img variant="top" src={Selection}/>
        <Card.Body>
          <Card.Title>Selection Sort</Card.Title>
          <Card.Text>
             Selection Sort Algorithm Visualization
          </Card.Text>
          <Button variant="primary"><Link className="link" to="#">GO SOMEWHERE</Link></Button>
        </Card.Body>
      </Card>

    </div>
  );
}

export default Home;
