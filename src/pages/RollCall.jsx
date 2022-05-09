import React from 'react';
import TopBar from '../components/top-bar/TopBar';
import UtilityBar from '../components/utility-bar/UtilityBar';
import StudentBox from '../components/student-box/StudentBox';

function RollCall({ className, generateCode, joinClass, students, code, loggedInUser }) {
  return (
    <div className={className}>
      <TopBar
        generateCode={generateCode}
        joinClass={joinClass}
        code={code}
        loggedInUser={loggedInUser}
      />

      <UtilityBar />

      {students.map((student) => (
        <StudentBox key={student.studentId} student={student} />
      ))}
    </div>
  );
}

export default RollCall;
