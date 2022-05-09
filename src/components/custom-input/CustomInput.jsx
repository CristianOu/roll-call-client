import './CustomInput.scss';
import React from 'react';

function CustomInput({ id }) {
  return (
    <div className="custom-input">
      <input type="text" id={id} placeholder="Enter the code" />
    </div>
  );
}

export default CustomInput;
