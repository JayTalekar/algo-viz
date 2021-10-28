import React,{useState,useEffect} from 'react'
import Node from "./Node/Node"
import "./Pathfinding.css"

import {getNodesInShortestPathOrder,dijkstra} from "../Algorithm/PathFinding/Djikstra"

function Pathfinding() {
    const [state,setState]=useState({grid:[],mouseIsPressed:false})
    const {grid, mouseIsPressed} = state;
    const START_NODE_ROW = 10;
    const START_NODE_COL = 15;
    const FINISH_NODE_ROW = 10;
    const FINISH_NODE_COL = 35;

    const getIntialGrid=()=>{
      const grid=[];
      for(let row=0;row<20;row++)
      {
          const currentRow=[];
          for(let col=0;col<50;col++)
          {
              currentRow.push(createNode(col,row))
          }
          grid.push(currentRow);
      }
    
      return grid;
  }

    console.log(grid);
    useEffect(()=>{
        const grid=getIntialGrid()
        setState({grid:grid,mouseIsPressed:false});
    },[])
    const handleMouseDown=(row, col) =>{
      console.log("mouse down")
      const newGrid = getNewGridWithWallToggled(state.grid, row, col);
      setState({grid: newGrid, mouseIsPressed: true});
    }
  
    const handleMouseEnter=(row, col)=> {
      if (!state.mouseIsPressed) return;
      console.log("mouse enter")
      const newGrid = getNewGridWithWallToggled(state.grid, row, col);
      setState({grid: newGrid,mouseIsPressed:true});
    }
  
    const handleMouseUp=() =>{
      console.log("mouse up");
      setState({grid:grid,mouseIsPressed: false});
    }
    
 
    const createNode = (col, row) =>{
        return{
            col,
            row,
            isStart: row === START_NODE_ROW && col === START_NODE_COL,
            isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
            distance: Infinity,
            isVisited: false,
            isWall: false,
            previousNode: null,
        }
    }
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

    const animateShortestPath=(nodesInShortestPathOrder)=> {
      for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
        setTimeout(() => {
          const node = nodesInShortestPathOrder[i];
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-shortest-path';
        }, 50 * i);
      }
    }
    const animateDijkstra=(visitedNodesInOrder, nodesInShortestPathOrder)=> {
      for (let i = 0; i <= visitedNodesInOrder.length; i++) {
        if (i === visitedNodesInOrder.length) {
          setTimeout(() => {
            animateShortestPath(nodesInShortestPathOrder);
          }, 10 * i);
          return;
        }
        setTimeout(() => {
          const node = visitedNodesInOrder[i];
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-visited';
        }, 10 * i);
      }
    }
    const visualizeDijkstra=()=> {
      const {grid} = state;
      const startNode = grid[START_NODE_ROW][START_NODE_COL];
      const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
      const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
      const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
      animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    }
  
    return (
      
        <div>
        <button className="btn"onClick={()=>visualizeDijkstra()}>Visualize Dijkstra</button>
            <div className="grid">
          {grid && grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const {row, col, isFinish, isStart, isWall} = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={state.mouseIsPressed}
                      onMouseDown={(row, col) => handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        handleMouseEnter(row, col)
                      }
                     onMouseUp={() => handleMouseUp()}
                      row={row}></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
        </div>
    )
}

export default Pathfinding
