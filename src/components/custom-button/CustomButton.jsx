import React from 'react';
import './CustomButton.scss';

function CustomButton({ title }) {
  return (
    <div className="btn btn-wrapper-small">
      <span className="btn-text">{title}</span>
    </div>
  );
}

export default CustomButton;
