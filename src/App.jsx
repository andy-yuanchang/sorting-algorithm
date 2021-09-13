import React, { useState } from 'react';

import './App.less';
import Button from './Button';
import InputRangeBar from './InputRangeBar';

import Sort from './Sort';

const SORT_ALGORITHM_LIST = {
  Bubble: 'Bubble',
  Selection: 'Selection',
  Insertion: 'Insertion',
  Quick: 'Quick',
  Merge: 'Merge',
  Heap: 'Heap',
};

const MAX_SPEED = 200;

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

  const renderAlgorithmOptions = () => (
    Object.keys(SORT_ALGORITHM_LIST).map(algorithmName => (
      <li
        className={`option ${algorithm === algorithmName && "selected"}`}
        onClick={(e) => handleChangeAlgorithm(e, algorithmName)}
      >
        {`${algorithmName} sort`}
        <span />
        <div className="selected-effect"></div>
      </li>
    ))
  )

  return (
    <div id="app">
      <ul className="options">
        {renderAlgorithmOptions()}
      </ul>

      <div className="settings">
        <div className="array-size">
          <p>{`Array Size: ${number}`}</p>
          <InputRangeBar
            min={10}
            max={500} 
            onChange={handleChangeNumber}
            value={number}
          />
        </div>

        <div className="render-speed">
          <p>{`Rendering Speed: ${MAX_SPEED - speed + 1}`}</p>
          <InputRangeBar
            min={1}
            max={MAX_SPEED} 
            onChange={handleChangeSpeed}
            value={MAX_SPEED - speed + 1}
          />
        </div>

        <div className="trigger-button">
          <Button text={`${isProcessing ? 'stop' : 'start'}`} onClick={handleClick} />
        </div>
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
