import '../../App.css';
import Dropdown from "../dropdown/Dropdown";

function TopBar() {

  return (
    <div className="top-bar">
        <Dropdown title={'Course'}/>
    </div>
  );
}

export default TopBar;
