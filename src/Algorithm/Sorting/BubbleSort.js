import React,{useState} from "react";
import "./BubbleSort.css";
function BubbleSort() {
  const arr = [15, 5, 10, 8, 20, 45, 39, 41, 25, 26];
  const [data,setData]=useState([15, 5, 10, 8, 20, 45, 39, 41, 25, 26])
  const [color,setColors]=useState(["#3DB2FF","#3DB2FF","#3DB2FF","#3DB2FF","#3DB2FF","#3DB2FF","#3DB2FF","#3DB2FF","#3DB2FF","#3DB2FF"])

  const sleep=(delay)=>new Promise((resolve)=>setTimeout(resolve, delay))
  const bubbleSort=async ()=>{
                 
 for(var i = 0; i < data.length; i++){
     
  // Last i elements are already in place  
  for(var j = 0; j < ( data.length - i -1 ); j++){
      
    // Checking if the item at present iteration 
    // is greater than the next iteration
     //yellow color means this two elements we are checking
    color[j]="yellow";
      color[j+1]="yellow";  
      setColors([...color])
      await sleep(200)
    if(data[j] > data[j+1]){
        
      // If the condition is true then swap them
      color[j]="red";
      color[j+1]="red";  
      setColors([...color])
      await sleep(200)
      
      var temp = data[j]
      data[j] = data[j + 1]
      data[j+1] = temp
      await sleep(200)
       setData([...data])
      await sleep(200)

      

    }
    color[j]="#3DB2FF";
      color[j+1]="#3DB2FF";  
      setColors([...color])
      await sleep(200)
    
  }
  color[data.length - i-1 ]="green"
  setColors([...color])

}
console.log(data)

}

  return (
    <div className="bubble-sort">
      <div className="bubble-sort-block">
        {data && data.map((ele,index) => {
          return (
            <>
              <div
                className="bar-graph"
                style={{
                  width: "30px",
                  height: `${ele * 10}px`,
                  backgroundColor:`${color[index]}`,
                  transition:"height 0.2s"
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


