import React from 'react';
import PropTypes from 'prop-types';

const Column = (props) => {
  const { length, width, status } = props;

  if (length < 0.1) console.log(length);
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
