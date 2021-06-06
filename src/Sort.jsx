import React, {
  useState, useEffect,
} from 'react';
import PropTypes from 'prop-types';

import Histogram from './Histogram';
import {
  SORT_STATUS,
  sortingBy,
} from './algorithm';

let renderQueue = [];

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

const clearAllTimeouts = () => {
  let id = window.setTimeout(null, 0);
  while (id--) {
    window.clearTimeout(id);
  }
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
  }, [length]);

  useEffect(() => {
    clearAllTimeouts();
  }, [speed, algorithmType, length]);

  useEffect(() => {
    clearAllTimeouts();
    if (isProcessing) {
      renderQueue = sortingBy(algorithmType, array);
      renderSortingEffect();
    }
  }, [isProcessing]);

  const renderSortingEffect = () => {
    for (let i = 0; i < renderQueue.length; i++) {
      lazyUpdate(i);
    }
  };

  const lazyUpdate = (counter) => {
    setTimeout(() => {
      if (renderQueue[counter]) {
        setArray(renderQueue[counter]);
      }
    }, speed * counter);
  };

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
