import React from 'react';
import TopBar from '../components/top-bar/TopBar';
import UtilityBar from '../components/utility-bar/UtilityBar';

function RollCall({ className }) {
  return (
    <div className={className}>
      <TopBar />

      <UtilityBar />
    </div>
  );
}

export default RollCall;
