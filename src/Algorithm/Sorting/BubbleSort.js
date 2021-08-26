import React,{useState} from "react";
import "./BubbleSort.css";
function BubbleSort() {
  const arr = [15, 5, 10, 8, 20, 45, 39, 41, 25, 26];
  const [data,setData]=useState([15, 5, 10, 8, 20, 45, 39, 41, 25, 26])
  const bubbleSort=()=>{
            alert("bubble sort")
  }
  return (
    <div className="bubble-sort">
      <div className="bubble-sort-block">
        {arr.map((ele) => {
          return (
            <>
              <div
                className="bar-graph"
                style={{
                  width: "30px",
                  height: `${ele * 10}px`,
                  backgroundColor: "#B83D87",
                }}
              >
                {ele}
              </div>
            </>
          );
        })}
      </div>
     <button onClick={bubbleSort}>sort</button>
    </div>
  );
}
export default BubbleSort;


