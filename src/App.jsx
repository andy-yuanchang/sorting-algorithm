import React, { useState } from 'react';

import './App.less';
import Button from './Button';

import Sort from './Sort';

const SORT_ALGORITHM_LIST = {
  Bubble: 'Bubble',
  Selection: 'Selection',
  Insertion: 'Insertion',
  Quick: 'Quick',
  Merge: 'Merge',
  Heap: 'Heap',
};

const MAX_SPEED = 50;

const App = () => {
  const [number, setNumber] = useState(10);
  const [speed, setSpeed] = useState(25);
  const [algorithm, setAlgorithm] = useState(SORT_ALGORITHM_LIST.Bubble);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChangeNumber = (e) => {
    setNumber(parseInt(e.target.value));
    setIsProcessing(false);
  };

  const handleChangeSpeed = (e) => {
    setSpeed(MAX_SPEED - parseInt(e.target.value) + 1);
    setIsProcessing(false);
  };

  const handleChangeAlgorithm = (e, type) => {
    setAlgorithm(type);
    setIsProcessing(false);
  };

  const handleClick = () => {
    setIsProcessing((preIsProcessing) => !preIsProcessing);
  };

  return (
    <div id="app">

      <div id="options">
        <div className="checkbox">
          <input type="checkbox" id="checkbox--bubble" name="selected-algorithm" onChange={(e) => handleChangeAlgorithm(e, SORT_ALGORITHM_LIST.Bubble)} checked={algorithm === SORT_ALGORITHM_LIST.Bubble} />
          <label htmlFor="checkbox--bubble">Bubble Sort</label>
        </div>
        <div className="checkbox">
          <input type="checkbox" id="checkbox--selection" name="selected-algorithm" onChange={(e) => handleChangeAlgorithm(e, SORT_ALGORITHM_LIST.Selection)} checked={algorithm === SORT_ALGORITHM_LIST.Selection} />
          <label htmlFor="checkbox--selection">Selection Sort</label>
        </div>
        <div className="checkbox">
          <input type="checkbox" id="checkbox--insertion" name="selected-algorithm" onChange={(e) => handleChangeAlgorithm(e, SORT_ALGORITHM_LIST.Insertion)} checked={algorithm === SORT_ALGORITHM_LIST.Insertion} />
          <label htmlFor="checkbox--insertion">Insertion Sort</label>
        </div>
        <div className="checkbox">
          <input type="checkbox" id="checkbox--quick" name="selected-algorithm" onChange={(e) => handleChangeAlgorithm(e, SORT_ALGORITHM_LIST.Quick)} checked={algorithm === SORT_ALGORITHM_LIST.Quick} />
          <label htmlFor="checkbox--quick">Quick Sort</label>
        </div>
        <div className="checkbox">
          <input type="checkbox" id="checkbox--merge" name="selected-algorithm" onChange={(e) => handleChangeAlgorithm(e, SORT_ALGORITHM_LIST.Merge)} checked={algorithm === SORT_ALGORITHM_LIST.Merge} />
          <label htmlFor="checkbox--merge">Merge Sort</label>
        </div>
        <div className="checkbox">
          <input type="checkbox" id="checkbox--heap" name="selected-algorithm" onChange={(e) => handleChangeAlgorithm(e, SORT_ALGORITHM_LIST.Heap)} checked={algorithm === SORT_ALGORITHM_LIST.Heap} />
          <label htmlFor="checkbox--heap">Heap Sort</label>
        </div>

        <div className="array-size">
          <p>Array Size</p>
          <input type="range" name="array-size" min="10" max="500" onChange={handleChangeNumber} />
        </div>

        <div className="render-speed">
          <p>Rendering Speed</p>
          <input type="range" name="render-speed" min="1" max={MAX_SPEED} onChange={handleChangeSpeed} />
        </div>

        <Button text={`${isProcessing ? 'stop' : 'start'}`} onClick={handleClick} />
      </div>

      <Sort
        length={number}
        speed={speed}
        algorithmType={algorithm}
        isProcessing={isProcessing}
        setIsProcessing={setIsProcessing}
      />
    </div>
  );
};

export default App;
