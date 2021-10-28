import React,{useState} from 'react'
import "./Queue.css"

function Queue() {
   
    const [elements,setElements]=useState([])
    const [colors,setColors] = useState([])
   

    const enqueue=()=>{
    
    if(elements.length<11){
       let  newElement=prompt("Enter value")
     
       setElements([...elements,newElement])
       setColors([...colors,false])
    }
    else{
        alert("Queue is full")
    }

    }

    const dequeue=()=>{
        if(elements.length==0){
            alert("Queue is empty")
            return;
    
        }
         elements.shift()
         setElements([...elements])
    }
    const peek=()=>{
        if(elements.length==0)
        {
            alert("Queue is empty")
            return;
        }
        colors[0]=true;
        setColors([...colors])
    }
    return (
      <>
        <div className="queue-div">
               <div className="queue">
                   {
                       elements.map((eachElement,eleIndex)=>{
                          return (
                          <div className="queue-element" style={{backgroundColor:colors[eleIndex]?"yellow":""}} key={eleIndex}>{eachElement}</div>
                          )
                       })
                   }
               </div>
        </div>
    <div className="queue-operations">
        <button className="btn" onClick={enqueue}>Enqueue</button>
        <button className="btn" onClick={dequeue}>Dequeue</button>
        <button className="btn" onClick={peek}>Peek</button>
        </div>
     </>
    )
}

export default Queue
