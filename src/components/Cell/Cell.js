import React from 'react'
import "./Cell.css"

function Cell(props) {
    const {row,col,isQueenPresent}=props;
    return (
        <div className="cell">
           {isQueenPresent ? <h1>👑</h1>:""} 
        </div>
    )
}

export default Cell
