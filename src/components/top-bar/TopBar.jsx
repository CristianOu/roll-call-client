import React, { useEffect, useState } from 'react';
import Dropdown from '../dropdown/Dropdown';
import './TopBar.scss';
import CustomButton from '../custom-button/CustomButton';
import { getTeacherCourses } from '../../services/api';
import { mapResponseToOptions } from '../../services/helperFunctions';
import Countdown, { zeroPad } from 'react-countdown';
import CustomInput from '../custom-input/CustomInput';
import ProfileIcon from '../../assets/images/profile-icon-test.svg';
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useNavigate } from 'react-router-dom';

const Completion = () => <span>Check in over!</span>;

const renderer = ({ minutes, seconds, completed }) => {
  if (completed) {
    // Render a complete state
    return <Completion />;
  } else {
    // Render a countdown
    return (
      <div className="countdown">
        <span>
          Time left: {zeroPad(minutes)}:{zeroPad(seconds)}
        </span>
      </div>
    );
  }
};

function ProfileModal({ signOut, navigator }) {
  return (
    <div className="modal-container">
      <div className="option">Profile</div>
      <div className="option" onClick={() => signOut({ navigator })}>
        Sign Out
      </div>
    </div>
  );
}

function TopBar({ generateCode, joinClass, loggedInUser, code }) {
  const [classStarted, setClassStarted] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [toggleModal, setToggleModal] = useState(false);
  const { signOut } = useAuth();

  const axios = useAxiosPrivate();
  const navigate = useNavigate();

  const handleCourseChange = (option) => {
    setSelectedCourse(option.value);
  };

  useEffect(() => {
    // get user id from state
    const userId = 1;
    axios
      .get(`/api/users/classes/courses/all/${userId}`)
      // getTeacherCourses(userId)
      .then((response) => {
        if (response.data.message !== 'Something went wrong') {
          setCourses(mapResponseToOptions(response.data));
          setLoading(false);
          setError(undefined);
        } else {
          setLoading(false);
          setError('Something went wrong');
        }
      })
      .catch(() => {
        setLoading(false);
        setError('Something went wrong');
      });
  }, []);

  return (
    <div className="top-bar-container">
      <div className="top-bar">
        <Dropdown title={'Course'} handleChange={handleCourseChange} options={courses} />

        {loggedInUser.role === 'STUDENT'
          ? [
              // <input type="text" id="code" />,
              <CustomInput id="code" />,

              <CustomButton title="Join Class" variant="info" action={joinClass} />
            ]
          : null}

        {classStarted
          ? [
              <span className="code-label">
                Code: <span className="code">{code}</span>
              </span>,
              <Countdown date={Date.now() + 600000} renderer={renderer} />
            ]
          : null}

        {!classStarted && loggedInUser.role === 'TEACHER' ? (
          <CustomButton
            title="Start Class"
            variant="action"
            action={() => {
              generateCode();
              setClassStarted(true);
            }}
          />
        ) : null}
      </div>
      <div className="profile-img-container">
        <img src={ProfileIcon} alt="icon" onClick={() => setToggleModal(!toggleModal)} />
      </div>
      {toggleModal ? <ProfileModal signOut={signOut} navigator={navigate} /> : ''}
    </div>
  );
}

export default TopBar;
