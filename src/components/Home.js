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
    <h1>Algo-Viz</h1>
        <Button className="button" variant="default"><Link className="link" to="/searching-sorting">Searching & Sorting</Link></Button>
        <Button className="button" variant="default"><Link className="link" to="">Data Structures</Link></Button>
        <Button className="button" variant="default"><Link className="link" to="/pathfinding">Path Finding</Link></Button>
        <Button className="button" variant="default"><Link className="link" to="">Graph</Link></Button>
    </div>
  );
}

export default Home;
