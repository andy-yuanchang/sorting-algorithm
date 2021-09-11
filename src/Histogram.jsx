import React from 'react';
import PropTypes from 'prop-types';

import Column from './Column';
import "./Histogram.less";

const MIN_HEIGHT = 0.1;

const Histogram = (props) => {
  const { array } = props;

  const columnWidth = 1 / array.length;

  return (
    <div id="histogram">
      {
        array.map((v) => {
          return (
            <Column
              length={MIN_HEIGHT + (v.value / array.length) * (1 - MIN_HEIGHT)}
              width={columnWidth}
              status={v.status}
            />
          );
        })
      }
    </div>
  );
};

Histogram.propTypes = {
  array: PropTypes.array.isRequired,
};

export default Histogram;
