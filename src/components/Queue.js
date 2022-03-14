import React,{useState} from 'react'
import "./Queue.css"
import Navbarr from "./Navbar";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";

function Queue() {
   
    const [elements,setElements]=useState([])
    const [colors,setColors] = useState([])
    const sleep=(delay)=>new Promise((resolve)=>setTimeout(resolve, delay))


    const enqueue=()=>{
    
    if(elements.length<11){
       let  newElement=prompt("Enter value")
       if(newElement==""){
           alert("Please enter a value");
           return;
       }
     
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
    const peek=async()=>{
        if(elements.length==0)
        {
            alert("Queue is empty")
            return;
        }
        colors[0]=true;
        setColors([...colors])
        await sleep(2000);
        colors[0]=false;
        setColors([...colors])
    }
    return (
      <>
      <Navbarr/>
      <div className="queue-home"   style={{width: '100%', height: '100vh'}}>
      <Row className="justify-content-md-center">
        <Col lg={8} md={8} xs={12} >
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
        </Col>
        <Col  lg={4} md={4} xs={12}>
    <div className="queue-operations" style={{marginLeft:"50px"}}>
     <Row>
     <Col lg={12} sm={4} xs={4} md={1}> <Button variant="primary"  onClick={enqueue}>Enqueue</Button></Col>
     <Col lg={12} sm={4} xs={4} md={1}>  <Button  variant="primary"  onClick={dequeue}>Dequeue</Button></Col>
     <Col lg={12} sm={4} xs={4} md={1}>   <Button variant="primary"  onClick={peek}>Peek</Button></Col>
      </Row>  
        </div>
    </Col>
    </Row>
    </div>
     </>
    )
}

export default Queue
