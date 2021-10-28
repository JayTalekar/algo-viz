import React,{useState} from 'react'
import "./Stack.css"

function Stack() {
   
    const [elements,setElements]=useState([])
    const [colors,setColors] = useState([])
   

    const push=()=>{
    
    if(elements.length<9){
       let  newElement=prompt("enter value")
     
       setElements([...elements,newElement])
       setColors([...colors,false])
    }
    else{
        alert("stack overflow")
    }

    }

    const pop=()=>{
        if(elements.length==0){
            alert("stack underflow")
            return;
    
        }
         elements.pop()
         setElements([...elements])
    }
    const peek=()=>{
        if(elements.length==0)
        {
            alert("stack underflow")
            return;
        }
        colors[elements.length-1]=true;
        setColors([...colors])
    }
    return (
      <>
        <div className="stack-div">
               <div className="stack">
                   {
                       elements.map((eachElement,eleIndex)=>{
                          return (
                          <div className="stack-element" style={{backgroundColor:colors[eleIndex]?"yellow":""}} key={eleIndex}>{eachElement}</div>
                          )
                       })
                   }
               </div>
        </div>
    <div className="stack-operations">
        <button className="btn" onClick={push} >Push</button>
        <button className="btn" onClick={pop} >Pop</button>
        <button className="btn" onClick={peek}>Peek</button>
        </div>
     </>
    )
}

export default Stack
