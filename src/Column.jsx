import React from 'react';
import PropTypes from 'prop-types';

const Column = (props) => {
  const { length, width, status } = props;

  const style = {
    height: `${length * 100}%`,
    width: `${width * 100}%`,
  };
  return (
    <div
      className={`column ${status}`}
      length={length}
      style={style}
    />
  );
};

Column.propTypes = {
  length: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};

export default Column;
