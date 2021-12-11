import React,{useState,useEffect} from 'react'
import Node from "./Node/Node"
import "./Pathfinding.css"

import {getNodesInShortestPathOrder,dijkstra} from "../Algorithm/PathFinding/Djikstra"

function Pathfinding() {
    const [state,setState]=useState({grid:[],mouseIsPressed:false})
    const [start,setStart]=useState(0)
    const {grid, mouseIsPressed} = state;
    const START_NODE_ROW = 10;
    const START_NODE_COL = 15;
    const FINISH_NODE_ROW = 10;
    const FINISH_NODE_COL = 35;

    const getIntialGrid=()=>{
      const initialGrid=[];
      for(let row=0;row<20;row++)
      {
          const currentRow=[];
          for(let col=0;col<50;col++)
          {
              currentRow.push(createNode(col,row))
          }
          initialGrid.push(currentRow);
      }
    
      return initialGrid;
  }

    console.log(grid);
    useEffect(()=>{
        const grid=getIntialGrid()
        setState({grid:grid,mouseIsPressed:false});
    },[])
    const handleMouseDown=(row, col) =>{
      if(!start){
      console.log("mouse down")
      const newGrid = getNewGridWithWallToggled(state.grid, row, col);
      setState({grid: newGrid, mouseIsPressed: true});
      }
    }
  
    const handleMouseEnter=(row, col)=> {
      if(!start){
      if (!state.mouseIsPressed) return;
      console.log("mouse enter")
      const newGrid = getNewGridWithWallToggled(state.grid, row, col);
      setState({grid: newGrid,mouseIsPressed:true});
      }
    }
  
    const handleMouseUp=() =>{
      if(!start){
      console.log("mouse up");
      setState({grid:grid,mouseIsPressed: false});
      }
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
            isNode:true
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
  
  const clearWalls=()=> {
      if (!start) {
        const newGrid = state.grid.slice();
        for (const row of newGrid) {
          for (const node of row) {
            let nodeClassName = document.getElementById(
              `node-${node.row}-${node.col}`,
            ).className;
            if (nodeClassName === 'node node-wall') {
              document.getElementById(`node-${node.row}-${node.col}`).className =
                'node';
              node.isWall = false;
            }
          }
        }
      }
    }
    //to clear grid 
const clearGrid = ()=>{
 
    //  clearWalls();
  if(!start){
      const newGrid = state.grid.slice();
      for (const row of newGrid) {
        for (const node of row) {
          let nodeClassName = document.getElementById(
            `node-${node.row}-${node.col}`,
          ).className;
         if(nodeClassName==='node node-wall')
         {
           node.isWall=false;
           node.isNode=true;
           node.isVisited=false;
           node.previousNode=null;
           document.getElementById(`node-${node.row}-${node.col}`).className =
           'node';
         }
         else if(nodeClassName==='node node-start')
         {
           node.isStart=true;
           node.isNode=true;
           node.isVisited=false;
           node.previousNode=null;
           document.getElementById(`node-${node.row}-${node.col}`).className =
           'node node-start';

         }
         else if(nodeClassName==='node node-finish')
         {
           node.isFinish=true;
           node.isNode=true;
           node.isVisited=false;
           node.previousNode=null;
           document.getElementById(`node-${node.row}-${node.col}`).className =
           'node node-finish';

         }
         else if(nodeClassName==='node node-visited')
         {
          node.isVisited=false;
          node.previousNode=null;
          node.isNode=true;
          document.getElementById(`node-${node.row}-${node.col}`).className =
          'node';
          
         }
         else if(nodeClassName==='node node-shortest-path')
         {
           node.isVisited=false;
           node.previousNode=null;
           node.isNode=true;
           document.getElementById(`node-${node.row}-${node.col}`).className =
           'node';

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
}
    const animateShortestPath=(nodesInShortestPathOrder)=> {
      for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
        if (nodesInShortestPathOrder[i].isFinish) {
          setTimeout(() => {
           setStart(0)
           console.log("ye loop")
          }, i * 50);
        }
        else{
        setTimeout(() => {
          const node = nodesInShortestPathOrder[i];
          if(node.isStart===true) {
            document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-start node-visited';
          }
          else if(node.isFinish===true) {
            document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-finish node-visited';
          }
          else{
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-shortest-path';
          }
         
        }, 40 * i);
      }
      }
    }
    const animateDijkstra=async (visitedNodesInOrder, nodesInShortestPathOrder)=> {
      for (let i = 0; i <= visitedNodesInOrder.length; i++) {
        if (i === visitedNodesInOrder.length) {
         setTimeout(() => {
         
            animateShortestPath(nodesInShortestPathOrder);
          }, 10 * i);
          return;
        }
        setTimeout(() => {
          const node = visitedNodesInOrder[i];
          if(node.isStart===true) {
            document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-start node-visited';
          }
          else if(node.isFinish===true) {
            document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-finish node-visited';
          }
          else{
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-visited';}
        }, 10 * i);
      }
     
    }
    const visualizeDijkstra=async()=> {
     
      const {grid} = state;
      setStart(1);
      console.log("start ",start)
      const startNode = grid[START_NODE_ROW][START_NODE_COL];
      const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
      const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
      const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
       animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);

     
    }
  
    return (
      
        <div>
       
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
        <div style={{"display":"flex","justifyContent": "center","alignItems":"center"}}>
        <button className="btn" onClick={()=>visualizeDijkstra()}>Visualize Dijkstra</button>
        <button className="btn" onClick={clearWalls}>Clear Wall</button>
        <button className="btn" onClick={clearGrid}>Clear Grid</button>
        </div>
        </div>
    )
}

export default Pathfinding
