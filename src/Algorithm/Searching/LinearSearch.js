import React,{useState} from "react";
import "./LinearSearch.css"

function LinearSearch()
{
    const [data,setData]=useState([12,33,13,22,28,3,44,19,40,4])
    const [color,setColors]=useState(["#3DB2FF","#3DB2FF","#3DB2FF","#3DB2FF","#3DB2FF","#3DB2FF","#3DB2FF","#3DB2FF","#3DB2FF","#3DB2FF"])

    const sleep=(delay)=>new Promise((resolve)=>setTimeout(resolve, delay))
    const search=async()=>{
        let  newElement=prompt("Enter value")
        
        for(var i = 0; i < data.length; i++)
        {
            color[i]="red"
            setColors([...color])
            await sleep(500)
            if(data[i] == newElement)
            {
                color[i]="yellow"
                setColors([...color])
                return;
            }
            color[i]="#3DB2FF"
        }        
    }
    
    return(

        <div className="linear">
      <div className="linear-block">
        {data && data.map((ele,index) => {
          return (
            <>
              <div
                className="bar-graph"
                style={{
                  width: "30px",
                  height: `${ele * 10}px`,
                  backgroundColor:`${color[index]}`,
                }}
              >
                {ele}
              </div>
            </>
          );
        })}
      </div>
     <button onClick={search}>Search</button>
    </div>
  );
}

export default LinearSearch;
