import './StudentsSection.scss';
import React from 'react';
import StudentBox from '../student-box/StudentBox';

function StudentsSection({ students }) {
  return (
    <div className={`students-section ${students.length ? '' : 'empty'}`}>
      {students.length ? (
        students.map((student) => (
          <StudentBox key={student.studentId} student={student} />
        ))
      ) : (
        <span className="empty-text">No student has joined the class yet.</span>
      )}
    </div>
  );
}

export default StudentsSection;
