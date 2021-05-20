import React, {
  useState, useEffect, useContext, useRef,
} from 'react';
import PropTypes from 'prop-types';

import Histogram from './Histogram';

const SORT_STATUS = {
  incomplete: 'incomplete',
  swap: 'swap',
  complete: 'complete',
};

let renderQueue = [];
const updateQueue = [];

const generateUnorderedArray = (length) => {
  const arr = [];
  for (let i = 0; i < length; i++) {
    arr[i] = {
      value: i + 1,
      status: SORT_STATUS.incomplete,
    };
  }
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const Sort = (props) => {
  const {
    length, algorithmType, isProcessing, setIsProcessing, speed,
  } = props;

  const [array, setArray] = useState(() => {
    const arr = generateUnorderedArray(length);
    return arr;
  });

  useEffect(() => {
    setArray((prevArr) => {
      const arr = generateUnorderedArray(length);
      return arr;
    });
    // console.log(length);
  }, [length]);

  useEffect(() => {
    renderQueue = [];
    for (const t of updateQueue) {
      clearTimeout(t);
    }
    console.log(renderQueue, updateQueue);
  }, [speed, algorithmType, length]);

  const lazyUpdate = (counter) => {
    // console.log(`${RENDER_SPEED * 50 * counter}ms`);
    setTimeout(() => {
      if (renderQueue[counter - 1]) {
        setArray(renderQueue[counter - 1]);
      }
    }, speed * counter);
  };

  const markIncomplete = (index1, index2, stepCounter) => {
    const t = setTimeout(() => {
      // console.log('incomplete', stepCounter);
      setArray((prevArr) => {
        const arr = prevArr.slice();
        arr[index1] = {
          ...arr[index1],
          status: SORT_STATUS.incomplete,
        };
        arr[index2] = {
          ...arr[index2],
          status: SORT_STATUS.incomplete,
        };
        return arr;
      });
    }, RENDER_SPEED * 50 * stepCounter);
    updateQueue.push(t);
  };

  const markSwap = (index1, index2, stepCounter) => {
    const t = setTimeout(() => {
      // console.log('swap', stepCounter);
      setArray((prevArr) => {
        const arr = prevArr.slice();
        // console.log(index1, index2, arr);
        [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
        arr[index1] = {
          ...arr[index1],
          status: SORT_STATUS.swap,
        };
        arr[index2] = {
          ...arr[index2],
          status: SORT_STATUS.swap,
        };
        return arr;
      });
    }, RENDER_SPEED * 50 * stepCounter);
    updateQueue.push(t);
  };

  const markComplete = (index, stepCounter) => {
    const t = setTimeout(() => {
      // console.log('complete', stepCounter);
      setArray((prevArr) => {
        const arr = prevArr.slice();
        arr[index] = {
          ...arr[index],
          status: SORT_STATUS.complete,
        };
        return arr;
      });
    }, RENDER_SPEED * 50 * stepCounter);
    updateQueue.push(t);
  };

  let stepCounter = 1;

  const bubbleSort = async () => {
    let hasSwapped = true;
    const arr = array.slice();
    let incompleteLength = arr.length - 1;
    for (let i = 0; i < arr.length - 1 && hasSwapped; i++) {
      hasSwapped = false;

      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j].value > arr[j + 1].value) {
          hasSwapped = true;
          stepCounter += 1;
          const index1 = j;
          const index2 = j + 1;
          [arr[index1], arr[index2]] = [arr[index2], arr[index1]];

          arr[index1] = {
            ...arr[index1],
            status: SORT_STATUS.swap,
          };
          arr[index2] = {
            ...arr[index2],
            status: SORT_STATUS.swap,
          };
          renderQueue.push(arr.slice());
          lazyUpdate(stepCounter);
          // markSwap(j, j + 1, stepCounter);
          // console.log(stepCounter);

          arr[index1] = {
            ...arr[index1],
            status: SORT_STATUS.incomplete,
          };
          arr[index2] = {
            ...arr[index2],
            status: SORT_STATUS.incomplete,
          };
          stepCounter += 1;
          renderQueue.push(arr.slice());
          lazyUpdate(stepCounter);
          // markIncomplete(j, j + 1, stepCounter);
          // console.log(stepCounter);
        }
      }

      arr[arr.length - i - 1] = {
        ...arr[arr.length - i - 1],
        status: SORT_STATUS.complete,
      };
      stepCounter += 1;
      renderQueue.push(arr.slice());
      lazyUpdate(stepCounter);
      // markComplete(arr.length - i - 1, stepCounter);
      // console.log(stepCounter);
      incompleteLength = arr.length - i - 1;
    }
    for (let i = 0; i < incompleteLength; i++) {
      arr[i] = {
        ...arr[i],
        status: SORT_STATUS.complete,
      };
      stepCounter += 1;
      renderQueue.push(arr.slice());
      lazyUpdate(stepCounter);
      // markComplete(i, stepCounter);
    }
    setIsProcessing(false);
  };

  if (isProcessing) {
    switch (algorithmType) {
      case 'Bubble':
        bubbleSort();
        break;
      case 'Selection':
        break;
      case 'Insertion':
        break;
      case 'Quick':
        break;
      case 'Merge':
        break;
      case 'Heap':
        break;
    }
  }

  // console.log(array);
  return (
    <div id="sort">
      <Histogram
        array={array}
      />
    </div>
  );
};

Sort.propTypes = {
  length: PropTypes.number,
  algorithmType: PropTypes.string.isRequired,
  isProcessing: PropTypes.bool,
};

Sort.defaultProps = {
  length: 10,
  isProcessing: false,
};

export default Sort;
