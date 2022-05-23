import React from 'react';
import TopBar from '../components/top-bar/TopBar';
import UtilityBar from '../components/utility-bar/UtilityBar';
import StudentsSection from '../components/students-section/StudentsSection';

function RollCall({ generateCode, joinClass, students, code }) {
  return (
    <div className="page-container">
      <TopBar generateCode={generateCode} joinClass={joinClass} code={code} />

      <UtilityBar />

      <StudentsSection students={students} />
    </div>
  );
}

export default RollCall;
