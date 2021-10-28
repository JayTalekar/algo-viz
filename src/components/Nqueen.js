import React,{useEffect,useState} from 'react'
import "./Nqueen.css"
import Cell from  "./Cell/Cell"
import {Queen} from "../Algorithm/BackTracking/Queen"

function Nqueen() {
    const [state,setState] =useState()
    const N=4;
   console.log(state)

    const createCell=(col,row)=>{
        return {
            col,
            row, 
            isQueenPresent:false
        }
    }

    const getInitialGrid=()=>{
        const grid=[];
        for(let row=0;row<N;row++) {
            const currentRow=[];
            for(let col=0;col<N;col++) {
                currentRow.push(createCell(col,row));
            }
            grid.push(currentRow)
            
        }
        return grid;
    }

    useEffect(()=>{
         const grid=getInitialGrid();
         setState([...grid])
    },[])
    return (
        <div className="nqueen">
        <h1>NQueen Problem (Backtracking)</h1>
        <button onClick={()=>Queen(state,N)}>Visualize</button>
         <div className="nqueen-board">
           {
               state && state.map((row,rowIdx)=>{
                   return (
                       <div key={rowIdx}>
                           {
                               row.map((cell,cellIdx)=>{
                                   const {col,row,isQueenPresent}=cell;
                                   return(
                                       <Cell
                                        key={cellIdx}
                                        col={col}
                                        row={row}
                                        isQueenPresent={isQueenPresent}
                                       ></Cell>
                                   )
                               })
                           }
                       </div>
                   )
               })
           }
         </div>
        </div>
    )
}

export default Nqueen
