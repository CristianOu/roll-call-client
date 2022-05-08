import Dropdown from '../dropdown/Dropdown';
import './TopBar.scss';
import CustomButton from '../custom-button/CustomButton';

function TopBar() {
  return (
    <div className="top-bar">
      <Dropdown title={'Course'} />

      <CustomButton title="Start Class" variant="action" />
    </div>
  );
}

export default TopBar;
