export const SORT_STATUS = {
  incomplete: 'incomplete',
  compare: 'compare',
  swap: 'swap',
  complete: 'complete',
};

const swapArr = (arr, index1, index2) => {
  [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
};

const mark = (status) => function (arr) {
  if (arguments.length > 0) {
    for (let i = 1; i < arguments.length; i++) {
      arr[arguments[i]] = {
        ...arr[arguments[i]],
        status,
      };
    }
    return arr.slice();
  }
};

const markSwap = mark(SORT_STATUS.swap);
const markCompare = mark(SORT_STATUS.compare);
const markIncomplete = mark(SORT_STATUS.incomplete);
const markComplete = mark(SORT_STATUS.complete);

const bubbleSort = (array) => {
  let hasSwapped = true;
  const arr = array.slice();
  let incompleteLength = arr.length - 1;
  const renderQueue = [];
  for (let i = 0; i < arr.length - 1 && hasSwapped; i++) {
    hasSwapped = false;
    for (let j = 0; j < arr.length - i - 1; j++) {
      const index1 = j;
      const index2 = j + 1;
      renderQueue.push(markCompare(arr, index1, index2));
      if (arr[j].value > arr[j + 1].value) {
        hasSwapped = true;
        swapArr(arr, index1, index2);
        renderQueue.push(markSwap(arr, index1, index2));
      }
      renderQueue.push(markIncomplete(arr, index1, index2));
    }

    renderQueue.push(markComplete(arr, arr.length - i - 1));
    incompleteLength = arr.length - i - 1;
  }

  for (let i = incompleteLength - 1; i >= 0; i--) {
    renderQueue.push(markComplete(arr, i));
  }

  return renderQueue;
};

const selectionSort = (array) => {
  const arr = array.slice();
  const renderQueue = [];
  for (let i = 0; i < arr.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      renderQueue.push(markSwap(arr, j));
      renderQueue.push(markIncomplete(arr, j));
      if (arr[j].value < arr[minIndex].value) {
        markIncomplete(arr, minIndex);
        minIndex = j;
      }
      renderQueue.push(markCompare(arr, minIndex));
    }

    if (i !== minIndex) {
      swapArr(arr, minIndex, i);
      renderQueue.push(markSwap(arr, minIndex, i));
      renderQueue.push(markIncomplete(arr, minIndex, i));
    }
    renderQueue.push(markComplete(arr, i));
  }

  return renderQueue;
};

const insertionSort = (array) => {
  const arr = array.slice();
  const renderQueue = [];
  for (let i = 0; i < arr.length; i++) {
    const orderedIndex = i;

    for (let j = orderedIndex; j > 0; j--) {
      renderQueue.push(markSwap(arr, j));
      renderQueue.push(markCompare(arr, j - 1));
      if (arr[j].value >= arr[j - 1].value) {
        renderQueue.push(markComplete(arr, j, j - 1));
        break;
      }
      swapArr(arr, j, j - 1);
      renderQueue.push(markComplete(arr, j));
    }
    renderQueue.push(markComplete(arr, 0));
  }

  return renderQueue;
};

const quickSort = (array) => {
  const arr = array.slice();
  const renderQueue = [];

  const partition = (data, left, right) => {
    let i = left - 1;
    renderQueue.push(markCompare(data, right));
    for (let j = left; j < right; j++) {
      if (data[j].value < data[right].value) {
        i++;
        swapArr(data, i, j);
        renderQueue.push(markSwap(data, i, j));
        renderQueue.push(markIncomplete(data, i, j));
      }
    }
    renderQueue.push(markSwap(data, i + 1));
    swapArr(data, i + 1, right);
    renderQueue.push(markIncomplete(data, i + 1, right));
    return i + 1;
  };

  const quick_sort = (data, left, right) => {
    if (left < right) {
      const pivot = partition(data, left, right);
      quick_sort(data, left, pivot - 1);
      quick_sort(data, pivot + 1, right);
    }
  };

  quick_sort(arr, 0, arr.length - 1);

  return renderQueue;
};

const mergeSort = (array) => {
  const arr = array.slice();
  const renderQueue = [];

  const merge = (leftArr, rightArr, leftIndex) => {
    const mergedArr = [];
    let lIndex = 0;
    let rIndex = 0;
    for (let i = 0; i < leftArr.length + rightArr.length; i++) {
      if (lIndex === leftArr.length) {
        mergedArr[i] = rightArr[rIndex];
        const oriIndex = getOriginalIndex(rightArr[rIndex].value);
        renderQueue.push(markSwap(arr, leftIndex + i, oriIndex));
        swapArr(arr, leftIndex + i, oriIndex);
        renderQueue.push(markIncomplete(arr, leftIndex + i, oriIndex));
        rIndex++;
      } else if (rIndex === rightArr.length) {
        mergedArr[i] = leftArr[lIndex];
        const oriIndex = getOriginalIndex(leftArr[lIndex].value);
        renderQueue.push(markSwap(arr, leftIndex + i, oriIndex));
        swapArr(arr, leftIndex + i, oriIndex);
        renderQueue.push(markIncomplete(arr, leftIndex + i, oriIndex));
        lIndex++;
      } else if (leftArr[lIndex].value < rightArr[rIndex].value) {
        mergedArr[i] = leftArr[lIndex];
        const oriIndex = getOriginalIndex(leftArr[lIndex].value);
        renderQueue.push(markSwap(arr, leftIndex + i, oriIndex));
        swapArr(arr, leftIndex + i, oriIndex);
        renderQueue.push(markIncomplete(arr, leftIndex + i, oriIndex));
        lIndex++;
      } else if (rightArr[rIndex].value < leftArr[lIndex].value) {
        mergedArr[i] = rightArr[rIndex];
        const oriIndex = getOriginalIndex(rightArr[rIndex].value);
        renderQueue.push(markSwap(arr, leftIndex + i, oriIndex));
        swapArr(arr, leftIndex + i, oriIndex);
        renderQueue.push(markIncomplete(arr, leftIndex + i, oriIndex));
        rIndex++;
      }
    }
    return mergedArr;
  };

  const merge_sort = (data, leftIndex) => {
    if (data.length > 1) {
      let leftArr = [];
      let rightArr = [];
      const middleIndex = parseInt(data.length / 2);

      const oriIndex = getOriginalIndex(data[middleIndex].value);
      renderQueue.push(markCompare(arr, oriIndex));
      renderQueue.push(markIncomplete(arr, oriIndex));

      for (let i = 0; i < middleIndex; i++) {
        leftArr[i] = data[i];
      }

      for (let i = middleIndex; i < data.length; i++) {
        rightArr[i - middleIndex] = data[i];
      }

      leftArr = merge_sort(leftArr, leftIndex);
      rightArr = merge_sort(rightArr, leftIndex + middleIndex);

      return merge(leftArr, rightArr, leftIndex);
    }
    return data;
  };

  const getOriginalIndex = (value) => arr.findIndex((x) => x.value === value);

  console.log(arr)
  const result = merge_sort(arr, 0, arr.length - 1);

  return renderQueue;
};

const heapSort = (array) => {

};
/**
 *
 * @param {SORT_ALGORITHM_LIST} algorithmType SORT_ALGORITHM_LIST = {
  Bubble: 'Bubble',
  Selection: 'Selection',
  Insertion: 'Insertion',
  Quick: 'Quick',
  Merge: 'Merge',
  Heap: 'Heap',
};
 * @param {Array} array [{
   value: number,
   status: string
 }]
 * @returns {Array}
 */
const sortingBy = (algorithmType, array) => {
  switch (algorithmType) {
    case 'Bubble':
      return bubbleSort(array);
    case 'Selection':
      return selectionSort(array);
    case 'Insertion':
      return insertionSort(array);
    case 'Quick':
      return quickSort(array);
    case 'Merge':
      return mergeSort(array);
    case 'Heap':
      return heapSort(array);
    default:
      return [];
  }
};

export {
  sortingBy,
};
