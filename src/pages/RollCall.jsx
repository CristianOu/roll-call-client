import React from 'react';
import TopBar from '../components/top-bar/TopBar';
import UtilityBar from '../components/utility-bar/UtilityBar';
import StudentBox from '../components/student-box/StudentBox';

function RollCall({ className, generateCode, joinClass }) {
  return (
    <div className={className}>
      <TopBar generateCode={generateCode} joinClass={joinClass} />

      <UtilityBar />

      <StudentBox />
    </div>
  );
}

export default RollCall;
