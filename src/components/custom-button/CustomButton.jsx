import React from 'react';
import './CustomButton.scss';

function CustomButton({ title, variant, action, id }) {
  return (
    <button className={`btn btn-wrapper-small ${variant}`} onClick={action} id={id}>
      {/*  2 variants so far: info and action */}
      <span className="btn-text">{title}</span>
    </button>
  );
}

export default CustomButton;
