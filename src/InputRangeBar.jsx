import React from 'react'
import PropTypes from 'prop-types'
import "./InputRangeBar.less"

function InputRangeBar(props) {
  const { onChange, value = 0, min, max } = props
  const widthPercentage = `${((value - min) / (max - min)) * 100}%`;

  return (
    <input
      className="input-range-bar"
      type="range"
      min={min}
      max={max}
      onChange={onChange}
      data-min-value={min}
      data-max-value={max}
      value={value}
      style={{
        background: `linear-gradient(90deg, rgba(255, 255, 255, 0.8) ${widthPercentage}, rgba(255, 255, 255, 0.5) ${widthPercentage})`
      }}
    />
  )
}

InputRangeBar.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number
}

export default InputRangeBar

