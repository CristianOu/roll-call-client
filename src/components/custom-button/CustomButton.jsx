import React from 'react';
import './CustomButton.scss';

function CustomButton({ title, variant, action }) {
  return (
    <button className={`btn btn-wrapper-small ${variant}`} onClick={action}>
      {/*  2 variants so far: info and action */}
      <span className="btn-text">{title}</span>
    </button>
  );
}

export default CustomButton;
