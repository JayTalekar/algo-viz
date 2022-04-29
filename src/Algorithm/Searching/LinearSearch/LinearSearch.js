import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import RangeSlider from "react-bootstrap-range-slider";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import {
  Button,
  Container,
  Col,
  Row,
  FormControl,
  Form,
} from "react-bootstrap";
import Node from "./Node";
import Identifier from "./Indentifier";
import styles from "./LinearSearch.module.css";

class LinearSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: this.randomNumberGenerator(10),
      input: "",
      isReset: false,
      timeTaken: 0,
      isFound: false,
      speed: 50,
      size: 10,
      customInput: "",
      able: true,
    };
    this.randomNumberGenerator = this.randomNumberGenerator.bind(this);
    this.checkHandler = this.checkHandler.bind(this);
    this.nodeGenerator = this.nodeGenerator.bind(this);
    this.resetHandler = this.resetHandler.bind(this);
    this.sleep = this.sleep.bind(this);
  }
  //onsole.log(this.customInout)
  randomNumberGenerator = (size) => {
    const randomNumberArray = [];
    for (let i = 0; i < size; i++) {
      let nodeObject = { isVisited: false, isFound: false };
      nodeObject["value"] = Math.floor(Math.random() * 100);
      randomNumberArray.push(nodeObject);
    }
    console.log(randomNumberArray);
    return randomNumberArray;
  };
  //for handling custom input
  handleCustomInput = () => {
    console.log(this.state.customInput); //
    let text = this.state.customInput;
    let textArray = text.split(",");
    let tempArray = [];
    let flag = false;

    for (let i = 0; i < textArray.length; i++) {
      if (!parseInt(textArray[i])) {
        alert("Invalid Input !");
        flag = true;
        break;
      }

      let nodeObject = { isVisited: false, isFound: false };
      nodeObject["value"] = parseInt(textArray[i]);
      tempArray.push(nodeObject);
      console.log(tempArray);
    }
    if (!flag) {
      this.setState({
        nodes: tempArray,
        input: "",
        isReset: !this.state.isReset,
        timeTaken: 0,
        isFound: false,
        speed: 50,
        size: tempArray.length,
      });
    }
  };

  sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  checkHandler = async () => {
    const tempState = { ...this.state };
    //this.setState({ able: false });
    const startTime = new Date();

    for (let i = 0; i < this.state.size; i++) {
      await this.sleep(400 - this.state.speed * 2);
      if (this.state.input === this.state.nodes[i].value) {
        const endTime = new Date();
        let timeDiff = endTime - startTime;
        timeDiff /= 1000;
        let timeDiffInSeconds = Math.round(timeDiff);
        tempState.timeTaken = timeDiffInSeconds;
        tempState.nodes[i].isVisited = true;
        tempState.nodes[i].isFound = true;
        tempState.isFound = true;
        this.setState({
          ...tempState,
        });
        return console.log(`Found. Time taken: ${this.state.timeTaken} sec`);
      } else {
        tempState.nodes[i].isVisited = true;
        this.setState({
          ...tempState,
        });
      }
      //this.setState({ able: false });
    }
    const endTime = new Date();
    let timeDiff = endTime - startTime;
    timeDiff /= 1000;
    let timeDiffInSeconds = Math.round(timeDiff);
    this.setState({
      timeTaken: timeDiffInSeconds,
    });
    return console.log(`Not Found. Time taken: ${this.state.timeTaken} sec`);
  };
  3;
  resetHandler = () => {
    this.setState({
      nodes: this.randomNumberGenerator(10),
      input: "",
      isReset: !this.state.isReset,
      timeTaken: 0,
      isFound: false,
      speed: 50,
      size: 10,
    });
  };

  nodeGenerator = () => {
    const nodes = this.state.nodes.map((nodeObject, index) => {
      return (
        <Node
          value={nodeObject.value}
          isVisited={nodeObject.isVisited}
          isFound={nodeObject.isFound}
          isReset={this.state.isReset}
          key={index}
        ></Node>
      );
    });
    return nodes;
  };

  render() {
    return (
      <Container>
        <Row>
          <Col xs={12}>
            <h1 style={{ fontSize: "3rem", letterSpacing: ".2rem" }}>
              Linear Search Visualizer
            </h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <div style={{ margin: "3rem" }}>{this.nodeGenerator()}</div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Col>
              <div class="mb-3 mx-auto">
                <label
                  for="exampleFormControlTextarea1"
                  class="form-label text-danger"
                >
                  Want to give Custom input ?
                </label>
                <textarea
                  class="form-control"
                  type="number"
                  value={this.state.customInput}
                  id="exampleFormControlTextarea1"
                  rows="3"
                  placeholder="please enter comma seperated numbers"
                  onChange={(event) =>
                    this.setState({ customInput: event.target.value })
                  }
                ></textarea>
                <br />
                <button
                  className="sort-button able m-1 mz-2"
                  onClick={this.handleCustomInput}
                  disabled={!this.state.able}
                >
                  Set Custom Input
                </button>
              </div>
            </Col>
            <div>
              <FormControl
                style={{ marginBottom: "2rem" }}
                placeholder="Enter the number"
                aria-label="Amount (to the nearest dollar)"
                type="text"
                id="userInput"
                value={this.state.input}
                onChange={(event) =>
                  this.setState({ input: Number(event.target.value) })
                }
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div>
              <Identifier title="Not visited yet" color="aquamarine" />
              <Identifier title="Visited" color="coral" />
              <Identifier title="Found" color="green" />
            </div>
          </Col>
        </Row>
        <Row>
          <Col style={{ padding: "2rem 0" }}>
            <Button
              variant="success"
              onClick={this.checkHandler}
              style={{ margin: "1rem" }}
            >
              Visualize
            </Button>
            <Button
              variant="dark"
              onClick={this.resetHandler}
              style={{ margin: "1rem" }}
            >
              Reset
            </Button>
          </Col>
          <Col style={{ padding: "2rem 1rem" }}>
            <Form.Label>Size</Form.Label>
            <RangeSlider
              variant="dark"
              value={this.state.size}
              onChange={(changeEvent) =>
                this.setState({
                  size: Number(changeEvent.target.value),
                  nodes: this.randomNumberGenerator(
                    Number(changeEvent.target.value)
                  ),
                  isReset: !this.state.isReset,
                })
              }
            />
          </Col>

          <Col style={{ padding: "2rem 1rem" }}>
            <Form.Label>Speed</Form.Label>
            <RangeSlider
              variant="dark"
              value={this.state.speed}
              onChange={(changeEvent) =>
                this.setState({ speed: Number(changeEvent.target.value) })
              }
            />
          </Col>
        </Row>
        <Row>
          <Col
            style={{
              padding: "2rem 0",
              border: ".3rem solid black",
              margin: "0 2rem",
            }}
          >
            <h3>{`Runtime: ${this.state.timeTaken} seconds`}</h3>
            <h3>
              {this.state.isFound ? "Status: Found" : "Status: Not Found"}
            </h3>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default LinearSearch;
