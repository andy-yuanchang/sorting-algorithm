import React from 'react'
import PropTypes from 'prop-types'
import "./InputRangeBar.less"

function InputRangeBar(props) {
  const { value = 0 } = props
  return (
    <div className="input-range-bar">
      
    </div>
  )
}

InputRangeBar.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.number,
}

export default InputRangeBar

