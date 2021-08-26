import React from 'react'
import { Router } from "@reach/router"
import  Home from "./components/Home"
import BubbleSort from "./Algorithm/Sorting/BubbleSort"
function App() {
  return (
    <div>
         <Router>
           <Home path="/"/>
           <BubbleSort path="/bubblesort" />
         </Router>
    </div>
  )
}

export default App
