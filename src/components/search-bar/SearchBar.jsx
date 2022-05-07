import './SearchBar.scss';
import React from 'react';

import SearchIcon from '../../assets/images/search-icon.svg';

function SearchBar() {
  return (
    <div className="search-bar">
      <input type="text" name="keyword" placeholder="Try ‘Andrea Corradini’" />

      <img src={SearchIcon} alt={'icon'} className="search-icon" />
    </div>
  );
}

export default SearchBar;
