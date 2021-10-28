import React from "react";
import Card from 'react-bootstrap/Card'
import {Link} from "@reach/router"
import Button from 'react-bootstrap/Button'
import "./SearchingSorting.css";
import bubble from "../images/bubble.jfif"
import Selection from "../images/selection.png"

function SearchingSorting() {
  return (
    <div className="searching-sorting">
      <Card className="sort_card" style={{ width: "18rem" }}>
        <Card.Img variant="top" src={bubble} />
        <Card.Body>
          <Card.Title>Bubble Sort</Card.Title>
          <Card.Text>Bubble Sort Algorithm Visualization</Card.Text>
          <Button variant="primary">
            <Link className="link" to="/bubblesort">
              GO SOMEWHERE
            </Link>
          </Button>
        </Card.Body>
      </Card>
      <br />
      <br />
      <Card className="sort_card" style={{ width: "18rem" }}>
        <Card.Img variant="top" src={Selection} />
        <Card.Body>
          <Card.Title>Selection Sort</Card.Title>
          <Card.Text>Selection Sort Algorithm Visualization</Card.Text>
          <Button variant="primary">
            <Link className="link" to="/selectionsort">
              GO SOMEWHERE
            </Link>
          </Button>
        </Card.Body>
      </Card>
      <br />
      <br />
      <Card className="sort_card" style={{ width: "18rem" }}>
        <Card.Img variant="top" src={Selection} />
        <Card.Body>
          <Card.Title>Insertion Sort</Card.Title>
          <Card.Text>Insertion Sort Algorithm Visualization</Card.Text>
          <Button variant="primary">
            <Link className="link" to="/selectionsort">
              GO SOMEWHERE
            </Link>
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default SearchingSorting;
