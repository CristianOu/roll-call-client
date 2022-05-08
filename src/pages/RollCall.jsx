import React from 'react';
import TopBar from '../components/top-bar/TopBar';
import UtilityBar from '../components/utility-bar/UtilityBar';
import StudentBox from '../components/student-box/StudentBox';

function RollCall({ className }) {
  return (
    <div className={className}>
      <TopBar />

      <UtilityBar />

      <StudentBox />
    </div>
  );
}

export default RollCall;
