import Dropdown from '../dropdown/Dropdown';
import './UtilityBar.scss';
import CustomButton from '../custom-button/CustomButton';
import SearchBar from '../search-bar/SearchBar';

function UtilityBar() {
  return (
    <div className="utility-bar">
      <SearchBar />
      {/*search bar */}
      {/*sorting option*/}
      <CustomButton title="Start Class" />
    </div>
  );
}

export default UtilityBar;
