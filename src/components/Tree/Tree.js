import React from "react";
import { BinarySearchTree, useTree } from "react-tree-vis";
import { useState } from "react";
import Navbarr from "../Navbar";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert'

import "./Tree.css";
function Tree() {
  const {
    ref,
    insert,
    remove,
    search,
    getData,
    clear,
    generateRandomTree,
    balance,
  } = useTree();
  const [insertValue, setInsertValue] = useState("");
  const [removeValue, setRemoveValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [statement, setStatement] = useState("");
  const [countClick, setCountClick] = useState(0);
  const [show,setShow]=useState(false);
  const treeStyles = {};
  const insertElement = (e) => {
    e.preventDefault();
    insert(insertValue);
    setCountClick(countClick + 1);
    setInsertValue("");
  };
  const deleteElement = () => {
    let result = remove(removeValue);
    if (!result) alert("element is not present");
    setRemoveValue("");
  };
  const searchElement = () => {
    let result = search(searchValue);
    if (!result) alert("element is not present");
    setSearchValue("");
  };
  const inorder = () => {
    const result = getData("inorder");
    setStatement(`inorder traversal: ${result}`);
    setShow(true)
    console.log(result);
  };
  const preorder = () => {
    const result = getData("preorder");
    setStatement(`preorder traversal: ${result}`);
    setShow(true);
    console.log(result);
  };
  const postorder = () => {
    const result = getData("postorder");
    setStatement(`postorder traversal: ${result}`);
    setShow(true)
    console.log(result);
  };
  const generateTree = () => {
    generateRandomTree(7);
    setCountClick(countClick + 1);
  };
  const deleteTree = () => {
    clear();
    setCountClick(0);
  };

  return (
    <>
      <Navbarr />
      <Container>
        <h1 style={{ width: "100%", textAlign: "center" }}>
          Binary Search Tree
        </h1>
         <> <Alert show={show} variant="success">
        <p>
         {statement}
        </p>
        
          <Button onClick={() => setShow(false)} variant="outline-success">
            Close me
          </Button>
       
      </Alert>
      </>

        <div className="tree">
          <div className="binary_tree_vis">
            <BinarySearchTree data={[]} ref={ref} treeStyles={treeStyles} />
            <br />
            
          </div>

          <div className="tree_operation">
            
              <Form.Group className="mb-3" controlId="formBasicEmail">
               
                <Form.Control
                  type="Number"
                  placeholder="Enter email"
                  onChange={(elem) =>
                    setInsertValue(parseInt(elem.currentTarget.value))
                  }
                  value={insertValue}
                />
                <Button
                  className="tree_button"
                  size="sm"
                  variant="primary"
                  onClick={(e)=>insertElement(e)}
                  disabled={!insertValue}
                >
                  Insert
                </Button>
              </Form.Group>
         
          
              <Form.Group className="mb-3" controlId="formBasicEmail">
              
                <Form.Control
                    type="number"
                    placeholder="enter value"
                    value={removeValue}
                    onChange={(elem) =>
                      setRemoveValue(parseInt(elem.currentTarget.value))
                    }
                    style={{ margin: "10px 0" }}
                />
                <Button
                  className="tree_button"
                  size="sm"
                  variant="primary"
                  onClick={deleteElement}
                  disabled={!removeValue}
                >
                  Remove
                </Button>
              </Form.Group>
          

        
              <Form.Group className="mb-3" controlId="formBasicEmail">
              
                <Form.Control
                    type="number"
                    placeholder="enter value"
                    value={searchValue}
                    onChange={(elem) =>
                      setSearchValue(parseInt(elem.currentTarget.value))
                    }
                    style={{ margin: "10px 0" }}
                />
                <Button
                  className="tree_button"
                  size="sm"
                  variant="primary"
                  onClick={searchElement}
                  disabled={!searchValue}
                >
                Search
                </Button>
              </Form.Group>
            <Button variant="primary"
              disabled={!countClick}
              onClick={inorder}
              style={{ margin: "5px 0" }}
            >
              Inorder
            </Button>
            <br />
            <Button variant="primary"
              disabled={!countClick}
              onClick={preorder}
              style={{ margin: "5px 0" }}
            >
              Preorder
            </Button>
            <br />
            <Button variant="primary"
              disabled={!countClick}
              onClick={postorder}
              style={{ margin: "5px 0" }}
            >
              postorder
            </Button>
            <br />
            <Button variant="primary"
              onClick={generateTree}
              style={{ margin: "5px 0" }}
            >
              Generate Random Tree
            </Button>
            <br />
            <Button variant="primary"
              disabled={!countClick}
              onClick={balance}
              style={{ margin: "5px 0" }}
            >
              balance tree
            </Button>
            <br />
            <Button variant="primary"
              onClick={deleteTree}
              style={{ margin: "5px 0" }}
            >
              Remove all Nodes
            </Button>
            <br />
          </div>
        </div>
      </Container>
    </>
  );
}

export default Tree;
