import React,{useState} from 'react'
import "./Stack.css"
import Navbarr from "./Navbar"
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";

function Stack() {
   
    const [elements,setElements]=useState([])
    const [colors,setColors] = useState([])
   
    const sleep=(delay)=>new Promise((resolve)=>setTimeout(resolve, delay))
    const push=()=>{
    
    if(elements.length<8){
       let  newElement=prompt("Enter value")
       if(newElement=="")
       {
           alert("Please Enter a value");
           return;
       }
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
    const peek=async()=>{
        if(elements.length==0)
        {
            alert("stack underflow")
            return;
        }
        colors[elements.length-1]=true;
        setColors([...colors])
        await sleep(2000);
        colors[elements.length-1]=false;
        setColors([...colors])
    }
    return (
      <>
        <Navbarr/>
        
     <div className="stack" style={{width: '100%', height: '100vh'}}>
     
     <Row className="justify-content-md-center">
        <Col lg="8" md="8" xs="12" >
        
        <div className="stack-div">
       
               <div className="stackcontainer">
                   {
                       elements.map((eachElement,eleIndex)=>{
                          return (
                          <div className="stack-element" style={{backgroundColor:colors[eleIndex]?"yellow":"",transition:"0.5s all"}} key={eleIndex}>{eachElement}</div>
                          )
                       })
                   }
               </div>
        </div>
        </Col>
        <Col sm={12} lg={4} md={4} xs={12}>
    <div className="stack-operations">
        <Row  >
      <Col lg={12} sm={4} xs={4} md={1}> <Button variant="primary"  onClick={push} >Push</Button></Col>
      <Col lg={12} sm={4} xs={4} md={1}> <Button variant="primary"  onClick={pop} >Pop</Button></Col>
      <Col lg={12} sm={4} xs={4} md={1}> <Button variant="primary"  onClick={peek}>Peek</Button></Col>
        </Row>
        </div>
        </Col>
        </Row>
        </div> 
    
     </>
    )
}

export default Stack
