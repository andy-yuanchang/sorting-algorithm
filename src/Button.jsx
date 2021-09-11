import React from 'react';
import PropTypes from 'prop-types';
import './Button.less';

const Button = (props) => {
  const { text, onClick } = props;

  const handleClick = (e) => {
    if (onClick) {
      onClick();
    }
    const pos = e.target.getBoundingClientRect();
    const ex = e.clientX - pos.left;
    const ey = e.clientY - pos.top;
    console.log(ex, ey);
  };

  return (
    <button type="button" className="button" onClick={handleClick}>
      {text}
      <span />
      <span />
      <span />
      <span />
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  onClick: null,
};

export default Button;
