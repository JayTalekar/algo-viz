import React, { useState, useEffect } from 'react';
import colors from './colorCodes';
import GithubIcon from '../Icons/GithubIcon';
import { mergeSortAnimation } from '../algorithms/mergesort';
import { insertionSort } from '../algorithms/insertion';
import { selectionSort } from '../algorithms/selectionsort';
import { bubbleSort } from '../algorithms/bubblesort';
import { quicksort } from '../algorithms/quicksort';
import { heapsort } from '../algorithms/heapsort';
import Navbarr from '../../../../components/Navbar'
// stylesheet
import './SortingVisualizer.css';

// Random Number Genrator
const generateRandomNumber = (i, j) => {
	return Math.floor(i + Math.random() * (j - i));
};

const Visualizer = () => {
	// state of the array
	const [mainArray, setMainArray] = useState([]);
	const [arrayLength, setArrayLength] = useState(15);
	const [animationSpeed, setAnimationSpeed] = useState(100);
	const [error,setError]=useState("");
	const [text,setText]=useState("");
	const [algo, setAlgo] = useState('mergesort');
	const [able, setAble] = useState(true);

	//Render the Array Before DOM loades
	/*useEffect(() => {
		if (able) populateArray(arrayLength);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [arrayLength, algo]);*/

	// ABLE / DISABLE BUTTONS ETC.
	useEffect(() => {
		const items = document.getElementsByClassName('able');

		if (!able) {
			for (let i = 0; i < items.length; i++) {
				items[i].style.pointerEvents = 'none';
				items[i].disabled = true;
			}
		} else {
			for (let i = 0; i < items.length; i++) {
				items[i].style.pointerEvents = 'auto';
				items[i].disabled = false;
			}
		}
	}, [able]);

	const populateArray = size => {
		const tempArr = [];
		for (let i = 0; i < size; i++) {
			const item = {
				idx: i,
				val: generateRandomNumber(25, 500),
			};
			tempArr.push(item);
			if (document.getElementsByClassName('sort-arrayBar')[i] != null) {
				document.getElementsByClassName('sort-arrayBar')[i].style.backgroundColor =
					colors.primaryColor;
			}
		}
		if (able) setMainArray(tempArr);
	};

	// colors every elements afte sorting
	const colorEveryElement = (arr, counter) => {
		setTimeout(() => {
			const sortedArray = [];
			for (let i = 0; i < arr.length; i++) {
				document.getElementsByClassName('sort-arrayBar')[i].style.backgroundColor =
					colors.afterSortingColor;

				sortedArray.push({
					idx: i,
					val: arr[i],
				});
				if (document.getElementsByClassName('sort-arrayBar')[i] != null) {
					document.getElementsByClassName('sort-arrayBar')[i].style.backgroundColor =
						colors.primaryColor;
				}
			}
			setMainArray(sortedArray);
			setAble(true);
		}, counter * animationSpeed);
	};

	// BUBBLE SORT
	const bubbleSortAnimate = () => {
		setAble(false);
		const { arr, count } = bubbleSort(mainArray, animationSpeed);
		colorEveryElement(arr, count + 1);
	};

	// MERGE SORT
	const mergeSort = () => {
		setAble(false);
		const { sortedArray, count } = mergeSortAnimation(
			mainArray,
			animationSpeed
		);
		colorEveryElement(sortedArray, count + 5);
	};

	// INSERTION SORT
	const insertionSortAnimate = () => {
		setAble(false);
		const { arr, count } = insertionSort(mainArray, animationSpeed);
		colorEveryElement(arr, count + 1);
	};

	// SELECTION SORT
	const selectionSortAnimate = () => {
		setAble(false);
		const { arr, count } = selectionSort(mainArray, animationSpeed);
		colorEveryElement(arr, count + 2);
	};

	//QUICK SORT
	const quicksortAnimate = () => {
		setAble(false);
		const { arr, count } = quicksort(mainArray, animationSpeed);
		colorEveryElement(arr, count + 1);
	};

	// HEAP SORT
	const heapsortAnimate = () => {
		setAble(false);
		const { arr, count } = heapsort(mainArray, animationSpeed);
		colorEveryElement(arr, count + 1);
	};
	/** code for handling custom input */
	const handleCustomInput=(e)=>{
		setMainArray([{}])
		let textArray=text.split(",");
		let tempArray=[];
		let flag=false;
		console.log(textArray)
		for(let i=0;i<textArray.length;i++){
              if(!parseInt(textArray[i])){
				  alert("Invalid Input !")
				  flag=true;
				  break;
			  }
			  tempArray.push({idx:i,val:parseInt(textArray[i])});
		}
		if(!flag){
			setMainArray(tempArray);
			setArrayLength(tempArray.length);
		}
		console.log(mainArray)
	}
	const startSorting = algo => {
		switch (algo) {
			case 'bubblesort':
				bubbleSortAnimate();
				break;

			case 'mergesort':
				mergeSort();
				break;

			case 'selectionsort':
				selectionSortAnimate();
				break;

			case 'insertionsort':
				insertionSortAnimate();
				break;
			case 'quicksort':
				quicksortAnimate();
				break;
			case 'heapsort':
				heapsortAnimate();
				break;
			default:
				mergeSort();
				break;
		}
	};

	return (
		<>
		<Navbarr/>
		<div className='sort-container'>
			<div className='sort-visualizeContainer'>
				{mainArray.map(item => {
					return (
						<div
							className='sort-arrayBar'
							style={{
								height: `${item.val}px`,
								backgroundColor: colors.primaryColor,
							}}
							key={item.idx}
						>
							{arrayLength < 29 && able && <span>{item.val}</span>}
						</div>
					);
				})}
			</div>
			<div className='sort-sidebar'>
				<header>
					Sorting Algorithm <br /> Visualizer
				</header>
				<div className='sort-select-box able'>
					<label htmlFor='algo'>select algorithm</label>
					<select
						name='algo'
						id='select'
						value={algo}
						onChange={e => setAlgo(e.target.value)}
					>
						<option value='bubblesort'>bubble sort</option>
						<option value='mergesort'>merge sort</option>
						<option value='insertionsort'>insertion sort</option>
						<option value='selectionsort'>selection sort</option>
						<option value='quicksort'>quick sort</option>
						<option value='heapsort'>heap sort</option>
					</select>
				</div>
				<div class="mb-3 mx-auto">
                      <label for="exampleFormControlTextarea1" class="form-label">Want to give Custom input ?</label>
                    <textarea class="form-control" type="number" value={text} id="exampleFormControlTextarea1" rows="3" placeholder="please enter comma seperated numbers" onChange={(e)=>setText(e.target.value)}></textarea>				   
					<br/><button className='sort-button able m-1 mz-2' onClick={handleCustomInput}>
					Set Custom Input
				</button>
             </div>
				<button className='sort-button able' onClick={() => startSorting(algo)}>
					Sort
				</button>

				<button
					onClick={() => populateArray(arrayLength)}
					className='sort-new-arr-btn button able'
				>
					Generate Random
				</button>

				<div className='sort-slider-container'>
					<label>Length of Array</label>
					<input
						className='sort-input-range able'
						type='range'
						value={arrayLength}
						onChange={e => setArrayLength(e.target.value)}
						min='7'
						max='150'
					/>
				</div>
				<div className='sort-slider-container'>
					<label>Speed</label>
					<input
						className='sort-input-range able'
						type='range'
						value={500 - animationSpeed}
						onChange={e => setAnimationSpeed(500 - e.target.value)}
						min='350'
						max='499'
					/>
				</div>

			
			</div>
		</div>
		</>
	);
};

export default Visualizer;
