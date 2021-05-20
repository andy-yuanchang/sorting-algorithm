import React from 'react';
import PropTypes from 'prop-types';

const Column = (props) => {
  const { length, width, color } = props;

  if (length < 0.1) console.log(length);
  const style = {
    height: `${length * 100}%`,
    width: `${width * 100}%`,
    background: color,
  };
  return (
    <div
      className="column"
      length={length}
      style={style}
    />
  );
};

Column.propTypes = {
  length: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};

export default Column;
