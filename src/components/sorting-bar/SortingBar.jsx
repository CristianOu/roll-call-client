import './SortingBar.scss';
import React from 'react';

import SortIcon from '../../assets/images/sort-icon.svg';

function SortingBar() {
  return (
    <div className="sorting-bar">
      <span>Sort by name</span>

      <img src={SortIcon} alt={'icon'} className="sort-icon" />
    </div>
  );
}

export default SortingBar;
