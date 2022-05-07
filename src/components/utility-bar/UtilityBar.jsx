import '../../App.css';
import Dropdown from '../dropdown/Dropdown';
import './UtilityBar.scss';
import CustomButton from '../custom-button/CustomButton';

function UtilityBar() {
  return (
    <div className="utility-bar">
      <Dropdown title={'Course'} />
      {/*search bar */}
      {/*sorting option*/}
      <CustomButton title="Start Class" />
    </div>
  );
}

export default UtilityBar;
