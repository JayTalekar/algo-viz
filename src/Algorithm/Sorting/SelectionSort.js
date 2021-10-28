import React, { useEffect, useState } from "react";
import "./SelectionSort.css"

function SelectionSort() {
  const arr = [15, 5, 10, 8, 20, 45, 39, 41, 25, 26];
  const [data, setData] = useState([15, 5, 10, 8, 20, 45, 39, 41, 25, 26]);
  const sleep=(delay)=>new Promise((resolve)=>setTimeout(resolve, delay))
  const [color, setColors] = useState([
    "#3DB2FF",
    "#3DB2FF",
    "#3DB2FF",
    "#3DB2FF",
    "#3DB2FF",
    "#3DB2FF",
    "#3DB2FF",
    "#3DB2FF",
    "#3DB2FF",
    "#3DB2FF",
  ]);
 
  useEffect(()=>{
    var randoms = Array.from({length: 10}, () => Math.floor(Math.random() * 40));
    setData([...randoms])
  },[])
  const selectionSort =async(inputArr)=> { 
    let n = inputArr.length;
        
    for(let i = 0; i < n; i++) {
        // Finding the smallest number in the subarray
        let min = i;
        color[i]="#FF865E"
        setColors([...color])
        await sleep(1000);
        for(let j = i+1; j < n; j++){
            if(inputArr[j] < inputArr[min]) {
                min=j; 
            }
         }
         color[min]="#FF0075"
         setColors([...color]);
         if (min !== i) {
             // Swapping the elements
             await sleep(1000);
             
             let tmp = inputArr[i]; 
             
             inputArr[i] = inputArr[min];
             inputArr[min] = tmp;  
             setData([...inputArr]);    
        }
        color[min]="#3DB2FF";
        setColors([...color]);
        color[i]="#3DB2FF";
        setColors([...color]);
    }
    return inputArr;
}
  return (<div className="selection-sort">
         <div className="selection-sort-block">
         {data && data.map((ele,index) => {
          return (
            <>
              <div
                className="bar-graph"
                style={{
                  width: "30px",
                  height: `${ele * 15}px`,
                  backgroundColor:`${color[index]}`,
                  transition:"height 1s"
                }}
              >
                {ele}
              </div>
            </>
          );
        })}
      </div>
     <button onClick={()=>selectionSort(data)}>sort</button>
         </div>
  )
}

export default SelectionSort;
