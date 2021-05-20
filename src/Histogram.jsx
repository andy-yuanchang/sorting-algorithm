import React from 'react';
import PropTypes from 'prop-types';

import Column from './Column';

const MIN_HEIGHT = 0.1;

const Histogram = (props) => {
  const { array } = props;

  const columnWidth = 1 / array.length;

  return (
    <div id="histogram">
      {
        array.map((v) => {
          let color;
          switch (v.status) {
            case 'incomplete':
              color = 'rgb(115, 182, 115)';
              break;
            case 'swap':
              color = 'rgb(115, 125, 255)';
              break;
            case 'complete':
              color = 'rgb(255, 125, 125)';
              break;
          }
          return (
            <Column
              length={MIN_HEIGHT + (v.value / array.length) * (1 - MIN_HEIGHT)}
              width={columnWidth}
              color={color}
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
