import React, { useEffect } from 'react';
import Dropdown from '../dropdown/Dropdown';
import './TopBar.scss';
import CustomButton from '../custom-button/CustomButton';

function TopBar({ generateCode, joinClass }) {
  return (
    <div className="top-bar">
      <Dropdown title={'Course'} />

      {/*<Socket />*/}
      <input type="text" id="code" />
      <CustomButton title="Join Class" variant="info" action={joinClass} />

      <CustomButton title="Start Class" variant="action" action={generateCode} />
    </div>
  );
}

export default TopBar;
