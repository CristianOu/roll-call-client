import './StudentBox.scss';
import React from 'react';

import ProfilePicture from '../../assets/images/profile-pic-example.png';
import CustomButton from '../custom-button/CustomButton';

function StudentBox({ student }) {
  return (
    <div className="student-box">
      <div className="profile-picture">
        <img src={ProfilePicture} alt={'icon'} className="sort-icon" />
      </div>

      <div className="info-section">
        <span className="name">
          {student.firstName} {student.lastName}
        </span>
        <span className="email">{student.email}</span>
      </div>

      <CustomButton title="View Profile" variant="info" />
    </div>
  );
}

export default StudentBox;
