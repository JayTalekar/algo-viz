import React from "react";
import { BinarySearchTree, useTree } from "react-tree-vis";
import { useState } from "react";

import "./Tree.css";
function Tree() {
  const { ref, insert, remove ,search,getData,clear,generateRandomTree,balance} = useTree();
  const [insertValue, setInsertValue] = useState("");
  const [removeValue, setRemoveValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [statement,setStatement]=useState("")
  const [countClick,setCountClick] = useState(0);
  const treeStyles={nodeNullFontColor:"#FF0000"}
  const insertElement =()=>{
    insert(insertValue)
    setCountClick(countClick+1);
    setInsertValue("")
  }
  const deleteElement =()=>{
   let result= remove(removeValue)
   if(!result) alert("element is not present")
   setRemoveValue("")
  }
  const searchElement=()=>{
      let result=search(searchValue)
      if(!result) alert("element is not present")
      setSearchValue("")
  }
  const inorder=()=>{
      const result=getData('inorder')
      setStatement(`inorder traversal: ${result}`)
      console.log(result)
  }
  const preorder=()=>{
    const result=getData('preorder')
    setStatement(`preorder traversal: ${result}`)
    console.log(result)
}
const postorder=()=>{
    const result=getData('postorder')
    setStatement(`postorder traversal: ${result}`)
    console.log(result)
}
const generateTree=()=>{
  generateRandomTree(7);
  setCountClick(countClick+1);
}
const deleteTree=()=>{
  clear();
  setCountClick(0);
}

  return (
    <>
      <h1 style={{ width: "100%", textAlign: "center" }}>Binary Search Tree</h1>
      <div className="tree">
        <div className="binary_tree_vis">
        <BinarySearchTree data={[]} ref={ref} treeStyles={treeStyles}/>
        <br/>
        <p style={{width: '100%', textAlign: 'center',marginTop:"75px"}}>{statement}</p>
        </div>
        <div className="tree_operation">
          <input
            type="number"
            placeholder="enter value"
            style={{ margin: "10px 0" }}
            onChange={(elem) =>
              setInsertValue(parseInt(elem.currentTarget.value))
            }
            value={insertValue}
          />
          <button className="tree_button" onClick={insertElement} disabled={!insertValue}>Insert</button>

          <br />
          <input
            type="number"
            placeholder="enter value"
            value={removeValue}
            onChange={(elem) =>
              setRemoveValue(parseInt(elem.currentTarget.value))
            }
            style={{margin:"10px 0"}}
          />
          <button className="tree_button" onClick={deleteElement} disabled={!removeValue}>Remove</button>

          <br />
          <input
            type="number"
            placeholder="enter value"
            value={searchValue}
            onChange={(elem) =>
              setSearchValue(parseInt(elem.currentTarget.value))
            }
            style={{margin:"10px 0"}}
          />
          <button className="tree_button" onClick={searchElement} disabled={!searchValue}>Search</button>
          <br/>
          <button className="tree_button" disabled={!countClick} onClick={inorder} style={{margin:"5px 0"}}>Inorder</button>
          <br/>
          <button className="tree_button" disabled={!countClick} onClick={preorder} style={{margin:"5px 0"}}>Preorder</button>
          <br/>
          <button  className="tree_button" disabled={!countClick} onClick={postorder} style={{margin:"5px 0"}} >postorder</button>
          <br/>
          <button className="tree_button" onClick={generateTree} style={{margin:"5px 0"}} >Generate Random Tree</button>
          <br/>
          <button className="tree_button" disabled={!countClick} onClick={balance} style={{margin:"5px 0"}} >balance tree</button><br/>
          <button className="tree_button"  onClick={deleteTree} style={{margin:"5px 0"}} >Remove all Nodes</button>
          <br/>
         
        </div>
      </div>
    </>
  );
}

export default Tree;
