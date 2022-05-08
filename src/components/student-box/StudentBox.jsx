import './StudentBox.scss';
import React from 'react';

import ProfilePicture from '../../assets/images/profile-pic-example.png';
import CustomButton from '../custom-button/CustomButton';

function StudentBox() {
  return (
    <div className="student-box">
      <div className="profile-picture">
        <img src={ProfilePicture} alt={'icon'} className="sort-icon" />
      </div>

      <div className="info-section">
        <span className="name">Robert Whistable</span>
        <span className="email">robert_whistable@stud.kea.dk</span>
      </div>

      <CustomButton title="View Profile" variant="info" />
    </div>
  );
}

export default StudentBox;
