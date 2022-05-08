import React from 'react';
import './CustomButton.scss';

function CustomButton({ title, variant }) {
  return (
    <div className={`btn btn-wrapper-small ${variant}`}>
      {/*  2 variants so far: info and action */}
      <span className="btn-text">{title}</span>
    </div>
  );
}

export default CustomButton;
