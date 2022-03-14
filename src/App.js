import React from 'react'
import { Router } from "@reach/router"
import  Home from "./components/Home"
import BubbleSort from "./Algorithm/Sorting/BubbleSort"
import SelectionSort from "./Algorithm/Sorting/SelectionSort"
import Pathfinding from './components/Pathfinding'
import SearchingSorting from "./components/SearchingSorting"
import DataStructure from "./components/DataStructure"
import Nqueens from "./Algorithm/Nqueen/backTrackingAlgorithms/nQueens/nQueens"
import Stack from "./components/Stack"
import Tree from "./components/Tree/Tree"
import Visualizer from "./Algorithm/Sorting/mergesort-quicksort/SortingVisualizer/Visualizer"
import Searching from "./components/Searching"
import LinearSearch from "./Algorithm/Searching/LinearSearch/LinearSearch"
import BinarySearch from "./Algorithm/Searching/BinarySearch/BinarySearch"
import Queue from "./components/Queue"
function App() {
  return (
    <div>
         <Router>
           <Home path="/"/>
           <BubbleSort path="/bubblesort" />
           <SelectionSort path="/selectionsort" />
            <Searching path="/searching-algorithms"/>
           <DataStructure path="/data-structure" />
           <Pathfinding path="/pathfinding" />
           <Nqueens path="/nqueen" />
           <Stack path="/stack" />
           <Queue path="/queue"/>
           <Tree path="/tree"/>
           <Visualizer path="sorting-algorithm"/>
           <LinearSearch path="/linear-search"/>
           <BinarySearch path="/binary-search"/>
         </Router>
    </div>
  )
}

export default App
