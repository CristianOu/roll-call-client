import './UtilityBar.scss';
import SearchBar from '../search-bar/SearchBar';
import SortingBar from '../sorting-bar/SortingBar';

function UtilityBar() {
  return (
    <div className="utility-bar">
      <SearchBar />
      {/*sorting option*/}
      <SortingBar />
    </div>
  );
}

export default UtilityBar;
