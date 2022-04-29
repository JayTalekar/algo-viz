import React, { useState, useEffect } from "react";
import Node from "./Node/Node";
import "./Pathfinding.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  getNodesInShortestPathOrder,
  dijkstra,
} from "../Algorithm/PathFinding/Djikstra";
import { dfs } from "../Algorithm/PathFinding/Dfs";
import { bfs } from "../Algorithm/PathFinding/Bfs";
import { AStar } from "../Algorithm/PathFinding/astar";
import Button from "react-bootstrap/Button";
import Navbarr from "../components/Navbar";
import Column from "./Column";
import { BreadcrumbSeparator } from "@chakra-ui/react";

function Pathfinding() {
  const [state, setState] = useState({ grid: [], mouseIsPressed: false });
  const [start, setStart] = useState(0);
  const { grid, mouseIsPressed } = state;
  const [START_NODE_ROW, set_START_NODE_ROW] = useState(10);
  const [START_NODE_COL, set_START_NODE_COL] = useState(5);
  const [FINISH_NODE_ROW, set_FINISH_NODE_ROW] = useState(10);
  const [FINISH_NODE_COL, set_FINISH_NODE_COL] = useState(30);
  const [sourceCol, setSourceCol] = useState("");
  const [sourceRow, setSourceRow] = useState("");
  const [destRow, setDestRow] = useState("");
  const [destCol, setDestCol] = useState("");
  const [disable, setDisable] = useState(false);

  const getIntialGrid = () => {
    const initialGrid = [];
    for (let row = 0; row < 20; row++) {
      const currentRow = [];
      for (let col = 0; col < 35; col++) {
        currentRow.push(createNode(col, row));
      }
      initialGrid.push(currentRow);
    }

    return initialGrid;
  };

  //handle custom input

  const handleCustomInput = (e) => {
    e.preventDefault();
    if (
      sourceRow <= 0 ||
      sourceCol <= 0 ||
      destRow <= 0 ||
      destCol <= 0 ||
      sourceRow > 20 ||
      sourceCol > 35 ||
      destRow > 20 ||
      destCol > 35
    ) {
      alert("Invalid input");
      return;
    }
    set_START_NODE_ROW(parseInt(sourceRow) - 1);
    set_START_NODE_COL(parseInt(sourceCol) - 1);
    set_FINISH_NODE_ROW(parseInt(destRow) - 1);
    set_FINISH_NODE_COL(parseInt(destCol) - 1);
    const grid = getIntialGrid();
    setState({ grid: grid, mouseIsPressed: false });
  };

  console.log(grid);
  useEffect(() => {
    const grid = getIntialGrid();
    setState({ grid: grid, mouseIsPressed: false });
  }, []);
  const handleMouseDown = (row, col) => {
    if (!start) {
      console.log("mouse down");
      const newGrid = getNewGridWithWallToggled(state.grid, row, col);
      setState({ grid: newGrid, mouseIsPressed: true });
    }
  };

  const handleMouseEnter = (row, col) => {
    if (!start) {
      if (!state.mouseIsPressed) return;
      console.log("mouse enter");
      const newGrid = getNewGridWithWallToggled(state.grid, row, col);
      setState({ grid: newGrid, mouseIsPressed: true });
    }
  };

  const handleMouseUp = () => {
    if (!start) {
      console.log("mouse up");
      setState({ grid: grid, mouseIsPressed: false });
    }
  };

  const createNode = (col, row) => {
    return {
      col,
      row,
      isStart: row === START_NODE_ROW && col === START_NODE_COL,
      isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
      distance: Infinity,
      isVisited: false,
      distanceToFinishNode:
        Math.abs(FINISH_NODE_ROW - row) + Math.abs(FINISH_NODE_COL - col),
      isWall: false,
      previousNode: null,
      isNode: true,
    };
  };
  const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };

  const clearWalls = () => {
    if (!start) {
      const newGrid = state.grid.slice();
      for (const row of newGrid) {
        for (const node of row) {
          let nodeClassName = document.getElementById(
            `node-${node.row}-${node.col}`
          ).className;
          if (nodeClassName === "node node-wall") {
            document.getElementById(`node-${node.row}-${node.col}`).className =
              "node";
            node.isWall = false;
          }
        }
      }
    }
  };
  //to clear grid
  const clearGrid = () => {
    //  clearWalls();
    if (!start) {
      const newGrid = state.grid.slice();
      for (const row of newGrid) {
        for (const node of row) {
          let nodeClassName = document.getElementById(
            `node-${node.row}-${node.col}`
          ).className;
          node.isVisited = false;
          /* if(nodeClassName==='node node-wall')
         {
           node.isWall=false;
           node.isNode=true;
           node.isVisited=false;
           node.previousNode=null;
           document.getElementById(`node-${node.row}-${node.col}`).className =
           'node';
         }*/
          if (nodeClassName === "node node-start") {
            node.isStart = true;
            node.isNode = true;
            node.isVisited = false;
            node.previousNode = null;
            document.getElementById(`node-${node.row}-${node.col}`).className =
              "node node-start";
          } else if (nodeClassName === "node node-finish") {
            node.isFinish = true;
            node.isNode = true;
            node.isVisited = false;
            node.previousNode = null;
            document.getElementById(`node-${node.row}-${node.col}`).className =
              "node node-finish";
          } else if (nodeClassName === "node node-visited") {
            node.isVisited = false;
            node.previousNode = null;
            node.isNode = true;
            document.getElementById(`node-${node.row}-${node.col}`).className =
              "node";
          } else if (nodeClassName === "node node-shortest-path") {
            node.isVisited = false;
            node.previousNode = null;
            node.isNode = true;
            document.getElementById(`node-${node.row}-${node.col}`).className =
              "node";
          }
          /* else{
          document.getElementById(`node-${node.row}-${node.col}`).className =
          'node';
         }
         */
        }
      }
      // setState({grid:newGrid,mouseIsPressed: false});
    }
  };
  const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      if (nodesInShortestPathOrder[i].isFinish) {
        setTimeout(() => {
          setStart(0);
        }, i * 50);
      } else {
        setTimeout(() => {
          const node = nodesInShortestPathOrder[i];
          if (node.isStart === true) {
            document.getElementById(`node-${node.row}-${node.col}`).className =
              "node node-start node-visited";
          } else if (node.isFinish === true) {
            document.getElementById(`node-${node.row}-${node.col}`).className =
              "node node-finish node-visited";
          } else {
            document.getElementById(`node-${node.row}-${node.col}`).className =
              "node node-shortest-path";
          }
        }, i * 50);
      }
    }
    setDisable(false);
  };
  const animate = async (visitedNodesInOrder, nodesInShortestPathOrder) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        if (node.isStart === true) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-start node-visited";
        } else if (node.isFinish === true) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-finish node-visited";
        } else {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-visited";
        }
      }, 10 * i);
    }
  };
  const visualize = (algo) => {
    if (!start) {
      setDisable(true);
      setStart(1);
      console.log("start is ", start);
      const startNode = grid[START_NODE_ROW][START_NODE_COL];
      const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
      let visitedNodesInOrder;
      switch (algo) {
        case "Dijkstra":
          visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
          break;
        case "DFS":
          visitedNodesInOrder = dfs(grid, startNode, finishNode);
          break;
        case "BFS":
          visitedNodesInOrder = bfs(grid, startNode, finishNode);
          break;
        case "astar":
          visitedNodesInOrder = AStar(grid, startNode, finishNode);
          break;
        default:
          // should never get here
          break;
      }
      const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
      animate(visitedNodesInOrder, nodesInShortestPathOrder);
    }
  };

  return (
    <>
      <Navbarr />
      <div>
        <Row>
          <Col xs={12} md={12} lg={8}>
            <div className="grid">
              <Column />
              <br />
              {grid &&
                grid.map((row, rowIdx) => {
                  return (
                    <>
                      <div key={rowIdx}>
                        <li class="row-li">{rowIdx + 1}</li>
                        {row.map((node, nodeIdx) => {
                          const { row, col, isFinish, isStart, isWall } = node;
                          return (
                            <>
                              <Node
                                key={nodeIdx}
                                col={col}
                                isFinish={isFinish}
                                isStart={isStart}
                                isWall={isWall}
                                mouseIsPressed={state.mouseIsPressed}
                                onMouseDown={(row, col) =>
                                  handleMouseDown(row, col)
                                }
                                onMouseEnter={(row, col) =>
                                  handleMouseEnter(row, col)
                                }
                                onMouseUp={() => handleMouseUp()}
                                row={row}
                              ></Node>
                            </>
                          );
                        })}
                      </div>
                    </>
                  );
                })}
            </div>
          </Col>

          <Col lg={4} xs={12} md={12}>
            <div
              className="d-grid gap-2"
              style={{
                display: "grid",
                "place-items": "center",
                height: "100%",
                width: "100%",
                "margin-right": "200px",
              }}
            >
              <Container>
                <Row>
                  <Col lg={12} sm={12}>
                    <Row>
                      <Col lg={6} sm={12}>
                        <input
                          type="number"
                          class="form-control my-2"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="Row no. of Source"
                          value={sourceRow}
                          onChange={(e) => setSourceRow(e.target.value)}
                        />
                      </Col>
                      <Col lg={6} sm={12}>
                        <input
                          type="number"
                          class="form-control my-2"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="Column no. of Source"
                          value={sourceCol}
                          onChange={(e) => setSourceCol(e.target.value)}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <hr />
                      <Col lg={6} sm={12}>
                        <input
                          type="number"
                          class="form-control my-2"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="Row no. of Destination"
                          value={destRow}
                          onChange={(e) => setDestRow(e.target.value)}
                        />
                      </Col>
                      <Col lg={6} sm={12}>
                        <input
                          type="number"
                          class="form-control my-2"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="Column no. of Destination"
                          value={destCol}
                          onChange={(e) => setDestCol(e.target.value)}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={12} sm={12}>
                        <Button
                          className="btn"
                          onClick={handleCustomInput}
                          disabled={disable}
                        >
                          Set Source and Destination
                        </Button>
                      </Col>
                    </Row>
                    <br />
                  </Col>

                  <br />
                  <Col lg={6} sm={12}>
                    <Button
                      className="btn"
                      onClick={() => visualize("Dijkstra")}
                    >
                      Visualize Dijkstra
                    </Button>
                  </Col>

                  <Col lg={6} sm={12}>
                    <Button
                      className="btn"
                      style={{ width: "150px" }}
                      onClick={() => visualize("DFS")}
                    >
                      DFS
                    </Button>
                  </Col>
                  <Col lg={6} sm={12}>
                    <Button
                      className="btn"
                      style={{ width: "150px" }}
                      onClick={() => visualize("BFS")}
                    >
                      BFS
                    </Button>
                  </Col>
                  <Col lg={6} sm={12}>
                    <Button
                      className="btn"
                      style={{ width: "150px" }}
                      onClick={() => visualize("astar")}
                    >
                      ASTAR
                    </Button>
                  </Col>
                  <Col lg={6} sm={12}>
                    <Button
                      className="btn"
                      style={{ width: "150px" }}
                      onClick={clearWalls}
                    >
                      Clear Wall
                    </Button>
                  </Col>
                  <Col lg={6} sm={12}>
                    <Button
                      className="btn"
                      style={{ width: "150px" }}
                      onClick={clearGrid}
                    >
                      Clear Grid
                    </Button>
                  </Col>
                </Row>
              </Container>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Pathfinding;
